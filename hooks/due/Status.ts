// // hooks/useSetDueStatus.ts  — optimistic ONLY for ["dues"]
// "use client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { DueType } from "@/lib/databaseSchemas"
// import { api } from "@/lib/api";

// export function useUpdateDueDateStatus() {
//   const qc = useQueryClient();

//   return useMutation({
//     mutationFn: (p: { id: string; status: DueType["status"] }) =>
//       api<DueType>(`/api/dues/${p.id}`, {
//         method: "PUT",
//         body: JSON.stringify({ status: p.status }),
//       }),

//     // ✅ OPTIMISTIC: update ONLY the list cache
//     onMutate: async ({ id, status }) => {
//       await qc.cancelQueries({ queryKey: ["dues"] });
//       const prev = qc.getQueryData<DueType[]>(["dues"]);
//       qc.setQueryData<DueType[]>(["dues"], (old) =>
//         (old ?? []).map((d) => (d.id === id ? { ...d, status } : d))
//       );
//       return { prev };
//     },

//     // 🔁 ROLLBACK if server fails
//     onError: (_e, _vars, ctx) => {
//       if (ctx?.prev) qc.setQueryData(["dues"], ctx.prev);
//     },

//     // ♻ REFRESH list and detail (no optimistic on detail)
//     onSettled: (_data, _err, { id }) => {
//       qc.invalidateQueries({ queryKey: ["dues"] });
//       qc.invalidateQueries({ queryKey: ["dues", id] });
//     },

//     retry: 0,
//   });
// }