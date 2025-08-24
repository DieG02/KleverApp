import { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import Voice, {
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';
import {
  MicrophoneIcon,
  PlusIcon,
  StopIcon,
} from 'react-native-heroicons/mini';
import { addItem } from '../services/firestore/collection';
import styles from '../styles/components/TextInputCustom';
import { useTranslation } from 'react-i18next';

interface VoiceRecognition {
  recording: boolean;
  results: string[];
  partialResults: string[];
}
const voiceReset: VoiceRecognition = {
  recording: false,
  results: [],
  partialResults: [],
};
export default function TextInputCollection({
  collectionId,
}: {
  collectionId: string;
}) {
  const [voice, setVoice] = useState<VoiceRecognition>(voiceReset);
  const { t, i18n } = useTranslation();

  const _addNewItem = () => {
    const label = voice.results[0].trim();
    if (!label) return null;
    addItem(collectionId, { label: label });
    setVoice(voiceReset);
  };
  const _startRecognizing = async () => {
    setVoice(voiceReset);
    try {
      await Voice.start(i18n.language);
    } catch (error) {
      console.error('_startRecognizing error: ', error);
    }
  };
  const _stopRecognizing = async () => {
    setVoice((prevState: any) => ({
      ...prevState,
      recording: false,
    }));
    try {
      Voice.removeAllListeners();
      await Voice.stop();
    } catch (error) {
      console.error('_stopRecognizing error: ', error);
    }
  };
  const _destroyRecognizer = async () => {
    setVoice(voiceReset);
    try {
      await Voice.destroy();
    } catch (error) {
      console.error('_destroyRecognizer error: ', error);
    }
  };

  // const services = await Voice.getSpeechRecognitionServices();
  const onSpeechStart = (e: any) => {
    setVoice((prevState: any) => ({
      ...prevState,
      started: '√',
      recording: true,
    }));
  };
  const onSpeechEnd = async (e: any) => {
    setVoice((prevState: any) => ({
      ...prevState,
      end: '√',
      recording: false,
    }));
  };
  const onSpeechError = (e: SpeechErrorEvent) => {
    _destroyRecognizer();
  };
  const onSpeechResults = (e: SpeechResultsEvent) => {
    setVoice((prevState: any) => ({
      ...prevState,
      results: e.value,
      partialResults: [],
    }));
  };
  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    setVoice((prevState: any) => ({
      ...prevState,
      partialResults: e.value,
    }));
  };

  const AddNewItemsButton = () => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={_addNewItem}
        disabled={!voice.results[0]?.trim()}>
        <PlusIcon color={styles.icon.color} />
      </TouchableOpacity>
    );
  };
  const StarRecordButton = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={_startRecognizing}>
        <MicrophoneIcon color={styles.icon.color} />
      </TouchableOpacity>
    );
  };
  const StopRecordButton = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={_stopRecognizing}>
        <StopIcon color={styles.icon.color} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.footer}>
        <TextInput
          style={styles.input}
          maxLength={75}
          placeholder={
            voice.recording
              ? t('collection.recording')
              : t('collection.new_item')
          }
          value={voice.results[0]}
          onChangeText={text =>
            setVoice((prevState: any) => ({ ...prevState, results: [text] }))
          }
          placeholderTextColor='#858585'
        />
        {voice.recording ? (
          <StopRecordButton />
        ) : !!voice.results[0] || !!voice.partialResults[0] ? (
          <AddNewItemsButton />
        ) : (
          <StarRecordButton />
        )}
      </View>
    </View>
  );
}
