import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { TimerContext } from './TimerProvider';

const FocusScreen = () => {
  const {
    isRunning, setIsRunning,
    minutes, setMinutes,
    seconds, setSeconds,
    studyPurpose, setStudyPurpose,
    endTime, setEndTime,
    showEndModal, setShowEndModal,
    modalMessage, setModalMessage,
  } = useContext(TimerContext);

  const navigation = useNavigation();
  const totalDuration = 25 * 60;
  const currentDuration = minutes * 60 + seconds;
  const progress = (currentDuration / totalDuration) * 100;

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1;
          if (minutes > 0) {
            setMinutes((m) => m - 1);
            return 59;
          }
          clearInterval(timer);
          setIsRunning(false);
          setModalMessage('Time is up! Great work!');
          setShowEndModal(true);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, minutes]);

  const formatTime = (t) => String(t).padStart(2, '0');

  const startFocus = () => {
    if (!studyPurpose.trim()) return;
    setEndTime(new Date(new Date().getTime() + currentDuration * 1000));
    setIsRunning(true);
  };

  const stopFocus = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    setEndTime(null);
    setShowEndModal(false);
    setStudyPurpose('');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Focus Mode</Text>

      <AnimatedCircularProgress
        size={250}
        width={15}
        fill={progress}
        tintColor="#8A63D2"
        backgroundColor="#2D2D2D"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <Text style={styles.timerText}>
            {formatTime(minutes)}:{formatTime(seconds)}
          </Text>
        )}
      </AnimatedCircularProgress>

      <TextInput
        style={styles.input}
        placeholder="What are you studying?"
        placeholderTextColor="rgba(255, 255, 255, 0.7)"
        value={studyPurpose}
        onChangeText={setStudyPurpose}
        editable={!isRunning}
      />

      <View style={styles.minutePickerContainer}>
        <Text style={styles.minutePickerLabel}>Minutes:</Text>
        <Picker
          selectedValue={minutes}
          onValueChange={(v) => setMinutes(parseInt(v))}
          style={{ color: '#fff', width: 150 }}
          enabled={!isRunning}
        >
          {Array.from({ length: 56 }, (_, i) => i + 5).map((n) => (
            <Picker.Item key={n} label={`${n}`} value={n} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={isRunning ? styles.stopButton : styles.startButton}
        onPress={isRunning ? stopFocus : startFocus}
      >
        <Text style={styles.buttonText}>{isRunning ? 'Stop Focusing' : 'Start Focusing'}</Text>
      </TouchableOpacity>

      {/* End Modal */}
      <Modal visible={showEndModal} animationType="slide" transparent onRequestClose={stopFocus}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalMessage}</Text>
            <TouchableOpacity style={styles.modalCloseButton} onPress={stopFocus}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  timerText: { color: '#fff', fontSize: 38, fontWeight: 'bold' },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 30,
    width: '80%',
  },
  minutePickerContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  minutePickerLabel: { color: '#fff', fontSize: 16, marginRight: 10 },
  startButton: {
    backgroundColor: '#8A63D2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    width: '80%',
  },
  stopButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
    width: '80%',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 15,
    padding: 25,
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalCloseButton: {
    backgroundColor: '#8A63D2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  modalCloseButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default FocusScreen;
