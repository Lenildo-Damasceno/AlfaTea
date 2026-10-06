import { createContext, useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import { reminderEnabled, setReminder } from '../services/notifications';
const SettingsContext = createContext(null);
const KEY = '@alfatea/settings/v1';
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({ vibration: false });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(KEY).then(raw => {
      const saved = raw ? JSON.parse(raw) : {};
      if (active) setSettings({ vibration: saved.vibration === true });
    }).catch(() => { if (active) setError('Não foi possível recuperar suas preferências.'); }).finally(() => { if (active) setReady(true); });
    return () => { active = false; };
  }, []);
  async function updateVibration(value) {
    if (lock.current || !ready) return;
    lock.current = true; setBusy(true);
    try { const next = { vibration: value }; await AsyncStorage.setItem(KEY, JSON.stringify(next)); setSettings(next); setError(''); }
    finally { lock.current = false; setBusy(false); }
  }
  async function updateReminder(value) {
    if (lock.current) return;
    lock.current = true; setBusy(true);
    try { await setReminder(value); setNotifications(value); }
    finally { lock.current = false; setBusy(false); }
  }
  async function refreshReminder() { setNotifications(await reminderEnabled()); }
  async function feedback(correct = true) {
    if (!settings.vibration) return;
    if (correct) await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    else await Haptics.selectionAsync();
  }
  return <SettingsContext.Provider value={{ settings, ready, error, busy, notifications, updateVibration, updateReminder, refreshReminder, feedback }}>{children}</SettingsContext.Provider>;
}
export function useSettings() { return useContext(SettingsContext); }
