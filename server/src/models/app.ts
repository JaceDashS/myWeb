// server/src/models/app.ts
export interface App {
  id: number;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  apkUrl?: string | null;
  webUrl?: string | null;
  demoUrl?: string | null;
  githubUrl?: string | null;
  displayOrder: number;
  isActive: number;  // 0: 비활성, 1: 활성
  createdAt: Date;
  updatedAt: Date;
}

