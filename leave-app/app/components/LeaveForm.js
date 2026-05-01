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

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice not supported');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      setForm((prev) => ({
        ...prev,
        reason: prev.reason + ' ' + transcript,
      }));

      setListening(false);
    };

    recognition.onerror = () => setListening(false);

    recognition.start();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch('/api/leave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    alert('Leave request submitted!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">
          Leave Request
        </h2>

        <input
          className="w-full border p-2 rounded-lg"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full border p-2 rounded-lg"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
        />

        <input
          type="date"
          className="w-full border p-2 rounded-lg"
          value={form.endDate}
          onChange={(e) =>
            setForm({ ...form, endDate: e.target.value })
          }
        />

        <div className="relative">
          <textarea
            className="w-full border p-2 rounded-lg"
            placeholder="Reason"
            value={form.reason}
            onChange={(e) =>
              setForm({ ...form, reason: e.target.value })
            }
          />

          <button
            type="button"
            onClick={handleVoiceInput}
            className="absolute right-2 top-2 bg-blue-500 text-white px-2 py-1 rounded"
          >
            {listening ? 'Listening...' : '🎤'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}