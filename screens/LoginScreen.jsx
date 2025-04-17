import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { auth } from "../firebaseConfig"; // Make sure this is using the correct web-based SDK initialization

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const db = getFirestore(); // Access Firestore
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert("Email not verified", "Please verify your email before logging in.");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        throw new Error("No user found with these credentials");
      }

      // Dispatching user data to Redux store
      dispatch(setUser({
        email: user.email,
        uid: user.uid,
        name: userDoc.data().name || "",
      }));

      Alert.alert("Login Successful", "Welcome back!");
      navigation.replace("HomeScreen"); // Navigate to Main screen after successful login

    } catch (error) {
      Alert.alert("Login failed", "Please check your email and password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Please enter your details to login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Signing In..." : "Sign In"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={styles.registerText}>
          Don't have an account? <Text style={styles.registerLink}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D1321", padding: 20, justifyContent: "center" },
  title: { color: "#fff", fontSize: 28, fontWeight: "bold", textAlign: "center" },
  subtitle: { color: "#aaa", textAlign: "center", marginBottom: 20 },
  input: { backgroundColor: "#1B2432", color: "#fff", padding: 12, borderRadius: 8, marginBottom: 15 },
  button: { backgroundColor: "#3D5AFE", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  forgotText: { color: "#aaa", textAlign: "center", marginTop: 10, textDecorationLine: "underline" },
  registerText: { color: "#aaa", textAlign: "center", marginTop: 20 },
  registerLink: { color: "#3D5AFE", fontWeight: "bold" },
});

export default LoginScreen;
