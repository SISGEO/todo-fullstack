export interface ChecklistItem {
  id: string;
  description: string;
  completed: boolean;
  completedAt: Date | null;
}

export interface Checklist {
  id: string;
  name: string;
  projectId: string;
  status: 'pending' | 'completed' | 'non_compliant';
  items: ChecklistItem[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  companyId: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  companyId: string;
  items: Omit<ChecklistItem, 'id' | 'completed' | 'completedAt'>[];
}

export interface ChecklistStats {
  total: number;
  completed: number;
  pending: number;
  nonCompliant: number;
} 