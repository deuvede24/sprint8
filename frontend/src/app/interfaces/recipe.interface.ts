export interface Recipe {
    id: number;
    title: string;
    description: string;
    steps: string;
    category: string;
    is_premium: boolean;
    created_at?: string;
    updated_at?: string;
  }
  //