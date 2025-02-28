import { Checklist, ChecklistItem, Project, ChecklistTemplate, ChecklistStats } from '../types/checklist';

// Simulando um banco de dados em memória
const checklists: Checklist[] = [];
const projects: Project[] = [];
const templates: ChecklistTemplate[] = [];

export const checklistService = {
  // Projetos
  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const newProject = { ...project, id: Math.random().toString() };
    projects.push(newProject);
    return newProject;
  },

  async getProjects(companyId: string): Promise<Project[]> {
    return projects.filter(p => p.companyId === companyId);
  },

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Projeto não encontrado');
    
    projects[index] = { ...projects[index], ...data };
    return projects[index];
  },

  // Checklists
  async createChecklist(checklist: Omit<Checklist, 'id'>): Promise<Checklist> {
    const newChecklist = { ...checklist, id: Math.random().toString() };
    checklists.push(newChecklist);
    return newChecklist;
  },

  async getChecklists(projectId: string): Promise<Checklist[]> {
    return checklists.filter(c => c.projectId === projectId);
  },

  async updateChecklist(id: string, data: Partial<Checklist>): Promise<Checklist> {
    const index = checklists.findIndex(c => c.id === id);
    if (index === -1) throw new Error('Checklist não encontrado');
    
    checklists[index] = { ...checklists[index], ...data };
    return checklists[index];
  },

  async updateChecklistItem(
    checklistId: string,
    itemId: string,
    data: Partial<ChecklistItem>
  ): Promise<ChecklistItem> {
    const checklist = checklists.find(c => c.id === checklistId);
    if (!checklist) throw new Error('Checklist não encontrado');

    const itemIndex = checklist.items.findIndex(i => i.id === itemId);
    if (itemIndex === -1) throw new Error('Item não encontrado');

    checklist.items[itemIndex] = { ...checklist.items[itemIndex], ...data };
    return checklist.items[itemIndex];
  },

  // Templates
  async createTemplate(template: Omit<ChecklistTemplate, 'id'>): Promise<ChecklistTemplate> {
    const newTemplate = { ...template, id: Math.random().toString() };
    templates.push(newTemplate);
    return newTemplate;
  },

  async getTemplates(companyId: string): Promise<ChecklistTemplate[]> {
    return templates.filter(t => t.companyId === companyId);
  },

  // Estatísticas
  async getStats(projectId: string): Promise<ChecklistStats> {
    const projectChecklists = checklists.filter(c => c.projectId === projectId);
    
    return {
      total: projectChecklists.length,
      completed: projectChecklists.filter(c => c.status === 'completed').length,
      pending: projectChecklists.filter(c => c.status === 'pending').length,
      nonCompliant: projectChecklists.filter(c => c.status === 'non_compliant').length,
    };
  },
}; 