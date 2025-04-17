import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const isFormFilled = name && email && password && confirmPassword;

  // Password validation rules
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;

  // Calculate password strength
  const strength = [
    hasUpperCase,
    hasNumber,
    hasSpecialChar,
    isLongEnough,
  ].filter(Boolean).length;

  const getStrengthLabel = () => {
    if (strength === 4) return "Strong";
    if (strength >= 2) return "Medium";
    return "Weak";
  };

  const getStrengthColor = () => {
    if (strength === 4) return "#4CAF50"; // Green
    if (strength >= 2) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return false;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      // Send email verification
      await sendEmailVerification(user);

      // Notify user to verify email
      Alert.alert(
        "Success",
        "Verification email sent! Please verify before logging in."
      );
      
      // Navigate to the Login screen after registration
      navigation.navigate("LoginScreen");
      return true;
    } catch (error) {
      Alert.alert("Error", error.message);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        onChangeText={setName}
        value={name}
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        placeholderTextColor="#888"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          secureTextEntry={securePassword}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordVisible(true);
          }}
          value={password}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
          <Ionicons
            name={securePassword ? "eye-off" : "eye"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {passwordVisible && (
        <View style={styles.passwordCard}>
          <Text style={[styles.rule, hasUpperCase && styles.validRule]}>
            ✔ At least one uppercase letter
          </Text>
          <Text style={[styles.rule, hasNumber && styles.validRule]}>
            ✔ At least one number
          </Text>
          <Text style={[styles.rule, hasSpecialChar && styles.validRule]}>
            ✔ At least one special character
          </Text>
          <Text style={[styles.rule, isLongEnough && styles.validRule]}>
            ✔ Minimum 8 characters
          </Text>
        </View>
      )}

      <View style={styles.strengthContainer}>
        <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
          {getStrengthLabel()}
        </Text>
        <View style={styles.strengthBar}>
          {[...Array(4)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.strengthSegment,
                index < strength && { backgroundColor: getStrengthColor() },
              ]}
            />
          ))}
        </View>
      </View>

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Re-enter your password"
          secureTextEntry={secureConfirm}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholderTextColor="#888"
        />
        <TouchableOpacity onPress={() => setSecureConfirm(!secureConfirm)}>
          <Ionicons
            name={secureConfirm ? "eye-off" : "eye"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, !isFormFilled && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={!isFormFilled}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#0D1321",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  label: { color: "#fff", fontSize: 14, marginBottom: 5 },
  input: {
    backgroundColor: "#1B2432",
    padding: 15,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1B2432",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  passwordInput: { flex: 1, paddingVertical: 15, color: "#fff" },
  passwordCard: {
    backgroundColor: "#222",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  rule: { color: "#888", fontSize: 12 },
  validRule: { color: "#4CAF50" },
  strengthContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  strengthText: { fontWeight: "bold", marginRight: 10 },
  strengthBar: { flexDirection: "row", flex: 1 },
  strengthSegment: {
    flex: 1,
    height: 5,
    backgroundColor: "#444",
    marginHorizontal: 2,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#3D5AFE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#555" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  link: { color: "#3D5AFE", textAlign: "center", marginTop: 20 },
});

export default RegisterScreen;
