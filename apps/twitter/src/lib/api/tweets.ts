import { createClient } from '@/lib/supabase/client';
import type { Tweet, TweetWithProfile } from '@/types';

export async function getTweets(limit = 20): Promise<TweetWithProfile[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('tweets')
    .select(`
      *,
      profile:profiles(*)
    `)
    .is('reply_to_id', null)
    .is('retweet_of_id', null)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching tweets:', error);
    return [];
  }

  return data as TweetWithProfile[];
}

export async function getTweetById(id: string): Promise<TweetWithProfile | null> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('tweets')
    .select(`
      *,
      profile:profiles(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching tweet:', error);
    return null;
  }

  return data as TweetWithProfile;
}

export async function createTweet(content: string, imageUrl?: string): Promise<Tweet | null> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('User not authenticated');
    return null;
  }

  const { data, error } = await supabase
    .from('tweets')
    .insert({
      user_id: user.id,
      content,
      image_url: imageUrl || null,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating tweet:', error);
    return null;
  }

  return data as Tweet;
}

export async function deleteTweet(id: string): Promise<boolean> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('tweets')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting tweet:', error);
    return false;
  }

  return true;
}

export async function likeTweet(tweetId: string): Promise<boolean> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('User not authenticated');
    return false;
  }

  const { error } = await supabase
    .from('likes')
    .insert({
      user_id: user.id,
      tweet_id: tweetId,
    });

  if (error) {
    console.error('Error liking tweet:', error);
    return false;
  }

  return true;
}

export async function unlikeTweet(tweetId: string): Promise<boolean> {
  const supabase = createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('User not authenticated');
    return false;
  }

  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('user_id', user.id)
    .eq('tweet_id', tweetId);

  if (error) {
    console.error('Error unliking tweet:', error);
    return false;
  }

  return true;
}


