// "use client";

// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { Button } from "@/components/ui/button";
// import type { User } from "@supabase/supabase-js";

//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<number | null>(null);
//   const [utilisateurs, setUtilisateurs] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Récupère l'utilisateur connecté et son rôle
//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       setUser(user);
//       if (user) {
//         // Cherche le rôle dans la table Utilisateur
//         const { data, error } = await supabase
//           .from("Utilisateur")
//           .select("role")
//           .eq("auth_id", user.id)
//           .single();
//         if (data) setRole(data.role);
//       }
//       setLoading(false);
//     };
//     fetchUser();
//   }, []);

//   // Récupère tous les utilisateurs si admin
//   useEffect(() => {
//     if (role === 1) {
//       const fetchUtilisateurs = async () => {
//         const { data, error } = await supabase.from("Utilisateur").select("id, nom, prenom, email, role");
//         if (data) setUtilisateurs(data);
//       };
//       fetchUtilisateurs();
//     }
//   }, [role]);

//   if (loading) return <div>Chargement...</div>;

//   if (!user) return <div>Veuillez vous connecter.</div>;

//   if (role === 1) {
//     // ADMIN : Affiche la liste des utilisateurs avec CRUD (CRUD à compléter)
//     return (
//       <div className="p-8">
//         <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
//         <table className="w-full border">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Nom</th>
//               <th>Prénom</th>
//               <th>Email</th>
//               <th>Rôle</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {utilisateurs.map(u => (
//               <tr key={u.id}>
//                 <td>{u.id}</td>
//                 <td>{u.nom}</td>
//                 <td>{u.prenom}</td>
//                 <td>{u.email}</td>
//                 <td>{u.role === 1 ? "Admin" : "Utilisateur"}</td>
//                 <td>
//                   {/* Boutons CRUD à compléter */}
//                   <Button variant="outline" size="sm">Éditer</Button>{" "}
//                   <Button variant="destructive" size="sm">Supprimer</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* Ajout d'utilisateur et édition à faire */}
//       </div>
//     );
//   }

//   // UTILISATEUR SIMPLE : Affiche une page de présentation
//   return (
//     <div className="p-8 text-center">
//       <h1 className="text-2xl font-bold mb-4">Bienvenue sur votre espace utilisateur !</h1>
//       <p>Vous êtes connecté en tant qu'utilisateur standard.</p>
//     </div>
//   );
// }
