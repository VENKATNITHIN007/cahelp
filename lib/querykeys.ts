// Centralized query keys for React Query

export const queryKeys = {
  clients: {
    all: ["clients"] as const,
    detail: (id: string) => ["clients", id] as const,
  },
  dues: {
    all: ["dues"] as const,
    detail: (id: string) => ["dues", id] as const,
  },
  user: {
    profile: ["user"] as const,
  },
  dashboard:{
    counts:["counts"] as const,
    urgent:["urgent"] as const,
    pending:["pendingDues"] as const,
    completed:["completed"] as const,
    passed:["passed"] as const
  }
}