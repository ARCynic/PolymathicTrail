// import React from "react";
// import Card from "../UI/Card.jsx";
// import Tag from "../UI/Tag.jsx";
// import Button from "../UI/Button.jsx";

// import ProjectCard from "../projects/ProjectCard.jsx";
// import PostCard from "../blog/PostCard.jsx";

// import { projects } from "../../data/projects.js";
// import { posts } from "../../data/posts.js";

// export default function Highlights() {
//   const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);
//   const featuredPosts = posts.filter((p) => p.featured).slice(0, 3);

//   return (
//     <section className="mt-8 space-y-4">
//       <div className="flex items-end justify-between gap-4">
//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <Tag>Featured</Tag>
//             <Tag>Selected work</Tag>
//           </div>
//           <h2 className="text-2xl font-semibold tracking-tight text-white">Highlights</h2>
//           <p className="max-w-2xl text-sm text-white/65">
//             A quick snapshot of projects and writing. Expand each section to see everything.
//           </p>
//         </div>
//       </div>

//       {/* Card already has the ElectricBorder now (default Obsidian). */}
//       <Card className="p-5">
//         <div className="grid gap-5 lg:grid-cols-2">
//           {/* Projects */}
//           <section className="space-y-3">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-white">Projects</h3>
//               <Button to="/projects" variant="ghost">
//                 See all →
//               </Button>
//             </div>

//             <div className="grid gap-3">
//               {featuredProjects.map((p) => (
//                 <ProjectCard key={p.id} project={p} compact />
//               ))}
//             </div>
//           </section>

//           {/* Articles */}
//           <section className="space-y-3">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-white">Articles</h3>
//               <Button to="/blog" variant="ghost">
//                 See all →
//               </Button>
//             </div>

//             <div className="grid gap-3">
//               {featuredPosts.map((post) => (
//                 <PostCard key={post.id} post={post} compact />
//               ))}
//             </div>
//           </section>
//         </div>
//       </Card>
//     </section>
//   );
// }