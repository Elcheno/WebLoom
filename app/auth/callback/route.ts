import { createClient } from '@/utils/supabase/server';
import { type NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET (request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  console.log(code);

  if (code !== null) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code) 
  }

  return NextResponse.redirect(requestUrl.origin)
}