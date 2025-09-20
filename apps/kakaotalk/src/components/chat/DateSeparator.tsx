'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface DateSeparatorProps {
  date: Date;
}

export default function DateSeparator({ date }: DateSeparatorProps) {
  const formatDate = (date: Date) => {
    return format(date, 'yyyy년 M월 d일 EEEE', { locale: ko });
  };

  return (
    <div className="flex justify-center my-4">
      <div 
        className="px-3 py-1 rounded-full text-xs font-medium text-date-text"
        style={{ backgroundColor: '#b1c3d5' }}
      >
        {formatDate(date)}
      </div>
    </div>
  );
}
