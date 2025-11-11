// Space Adventure - App + Painel (Supabase Version)
// Base React prototype with Supabase integration for data storage and dashboard analytics

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { LineChart, Line, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// 🔧 Configure your Supabase project here
const supabaseUrl = 'https://YOUR_PROJECT_URL.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [page, setPage] = useState('form');
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    firstVisit: '',
    visits: '',
    city: '',
    state: '',
    groupType: '',
    source: '',
    ratings: {},
    liked: '',
    improve: '',
    recommend: '',
    contact: ''
  });

  useEffect(() => {
    if (page === 'dashboard') fetchData();
  }, [page]);

  const fetchData = async () => {
    const { data } = await supabase.from('space_feedback').select('*');
    setData(data || []);
  };

  const submitForm = async () => {
    await supabase.from('space_feedback').insert([form]);
    alert('Obrigado por responder! 🚀');
    setForm({
      firstVisit: '', visits: '', city: '', state: '', groupType: '', source: '', ratings: {}, liked: '', improve: '', recommend: '', contact: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {page === 'form' && (
        <Card className="max-w-lg mx-auto p-6 bg-slate-800">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Pesquisa de Satisfação – Space Adventure 🪐</h1>

            <p className="mb-2">É sua primeira visita?</p>
            <select className="w-full mb-3 p-2 text-black" value={form.firstVisit} onChange={e => setForm({...form, firstVisit: e.target.value})}>
              <option value="">Selecione</option>
              <option>Sim</option>
              <option>Não</option>
            </select>

            <p className="mb-2">Quantas vezes já veio?</p>
            <select className="w-full mb-3 p-2 text-black" value={form.visits} onChange={e => setForm({...form, visits: e.target.value})}>
              <option value="">Selecione</option>
              <option>1ª vez</option>
              <option>2 a 3 vezes</option>
              <option>4 ou mais vezes</option>
            </select>

            <input placeholder="Cidade" className="w-full mb-3 p-2 text-black" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
            <input placeholder="Estado" className="w-full mb-3 p-2 text-black" value={form.state} onChange={e => setForm({...form, state: e.target.value})} />

            <p className="mb-2">Como ficou sabendo?</p>
            <select className="w-full mb-3 p-2 text-black" value={form.source} onChange={e => setForm({...form, source: e.target.value})}>
              <option value="">Selecione</option>
              <option>Redes sociais</option>
              <option>Amigos/familiares</option>
              <option>Escola</option>
              <option>Agência de turismo</option>
              <option>Outros</option>
            </select>

            <p className="mb-2">O que mais gostou?</p>
            <textarea className="w-full mb-3 p-2 text-black" value={form.liked} onChange={e => setForm({...form, liked: e.target.value})} />

            <p className="mb-2">O que poderíamos melhorar?</p>
            <textarea className="w-full mb-3 p-2 text-black" value={form.improve} onChange={e => setForm({...form, improve: e.target.value})} />

            <p className="mb-2">Recomendaria o parque?</p>
            <select className="w-full mb-3 p-2 text-black" value={form.recommend} onChange={e => setForm({...form, recommend: e.target.value})}>
              <option value="">Selecione</option>
              <option>Sim, com certeza</option>
              <option>Talvez</option>
              <option>Não</option>
            </select>

            <input placeholder="E-mail ou telefone (opcional)" className="w-full mb-4 p-2 text-black" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} />

            <Button onClick={submitForm} className="w-full bg-blue-600 hover:bg-blue-700">Enviar Resposta 🚀</Button>
            <Button onClick={() => setPage('dashboard')} className="w-full mt-3 bg-gray-700 hover:bg-gray-800">Ver Painel Administrativo</Button>
          </CardContent>
        </Card>
      )}

      {page === 'dashboard' && (
        <Card className="max-w-4xl mx-auto p-6 bg-slate-800">
          <CardContent>
            <h1 className="text-2xl font-bold mb-4">Painel de Gestão – Space Adventure 🌌</h1>
            <Button onClick={() => setPage('form')} className="mb-4 bg-gray-700 hover:bg-gray-800">← Voltar para Formulário</Button>

            <p>Total de respostas: {data.length}</p>
            <LineChart width={600} height={300} data={data.map((d, i) => ({ index: i + 1, visits: d.visits }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="visits" stroke="#82ca9d" />
            </LineChart>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
