import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('leave_requests')
    .select('*')
    .order('created_at', { ascending: false });

  return Response.json(data);
}

export async function POST(req) {
  const body = await req.json();

  const { error } = await supabase.from('leave_requests').insert([
    {
      name: body.name,
      start_date: body.startDate,
      end_date: body.endDate,
      reason: body.reason,
      status: 'pending',
    },
  ]);

  return Response.json({ message: 'Saved' });
}

export async function PUT(req) {
  const { id, status } = await req.json();

  await supabase
    .from('leave_requests')
    .update({ status })
    .eq('id', id);

  return Response.json({ message: 'Updated' });
}