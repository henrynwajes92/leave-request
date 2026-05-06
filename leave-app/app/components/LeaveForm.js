'use client';

import { useState } from 'react';

export default function LeaveForm() {
  const [form, setForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  const [listening, setListening] = useState(false);

  const handleVoice = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.start();
    setListening(true);

    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setForm(prev => ({ ...prev, reason: prev.reason + ' ' + text }));
      setListening(false);
    };
  };

  const submit = async (e) => {
    e.preventDefault();
    await fetch('/api/leave', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    alert('Submitted');
  };

  return (
    <form onSubmit={submit} className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold text-center">Leave Request</h2>

      <input className="input" placeholder="Name"
        onChange={e => setForm({...form, name: e.target.value})} />

      <div className="flex gap-2">
        <input type="date" className="input"
          onChange={e => setForm({...form, startDate: e.target.value})}/>
        <input type="date" className="input"
          onChange={e => setForm({...form, endDate: e.target.value})}/>
      </div>

      <div className="relative">
        <textarea className="input" placeholder="Reason"
          onChange={e => setForm({...form, reason: e.target.value})}/>

        <button type="button" onClick={handleVoice}
          className="absolute right-2 top-2 bg-blue-500 text-white px-2 rounded">
          {listening ? '...' : '🎤'}
        </button>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Submit
      </button>
    </form>
  );
}