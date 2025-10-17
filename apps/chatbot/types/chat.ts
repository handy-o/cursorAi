export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
  options?: Array<{
    id: string;
    label: string;
    type?: 'category' | 'regulation' | 'restart';
  }>;
}

export interface ChatState {
  messages: Message[];
  currentStep: 'initial' | 'category_selected' | 'regulation_shown';
  selectedCategoryId?: string;
}


