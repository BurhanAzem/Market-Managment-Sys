// using Microsoft.AspNetCore.Identity;
// using System.Collections.Generic;
// using TTS.Source.Domain.Entities;
// using TTS.Source.Domain.Shared;
// using TTS.Source.Persistance.RelationalDB.Identity;

// namespace TTS.Source.Persistance.RelationalDB
// {
//     public class TTSDBContextSeed
//     {
//         public static async Task SeedAsync(TTSDBContext context)
//         {
//             try
//             {
//                 if (!context.Members.Any())
//                 {
//                     var member1 = new Member("member1");
//                     var member2 = new Member("member2");

//                     context.Members.Add(member1);
//                     context.Members.Add(member2);
//                     await context.SaveChangesAsync();

//                     var hasher = new PasswordHasher<ApplicationUser>();

//                     var user1 = new ApplicationUser("member1@mail.com", member1.Id)
//                     {
//                         Id = Guid.NewGuid(),
//                         NormalizedUserName = "MEMBER1@MAIL.COM",
//                         EmailConfirmed = true,
//                         NormalizedEmail = "MEMBER1@MAIL.COM",
//                         SecurityStamp = string.Empty,
//                         PasswordHash = hasher.HashPassword(null!, "Qwer$1234")
//                     };

//                     var user2 = new ApplicationUser("member2@mail.com", member2.Id)
//                     {
//                         Id = Guid.NewGuid(),
//                         NormalizedUserName = "MEMBER2@MAIL.COM",
//                         EmailConfirmed = true,
//                         NormalizedEmail = "MEMBER2@MAIL.COM",
//                         SecurityStamp = string.Empty,
//                         PasswordHash = hasher.HashPassword(null!, "Qwer$1234"),
//                     };

//                     context.Users.Add(user1);
//                     context.Users.Add(user2);
//                     await context.SaveChangesAsync();
//                 }

//                 if (!context.Projects.Any())
//                 {
//                     List<Member> members = new List<Member> { context.Members.ElementAt(0), context.Members.ElementAt(1) };

//                     foreach (var member in members)
//                     {
//                         List<Project> memberProjects = new List<Project>();
//                         for (int i = 0; i < 10; i++)
//                         {
//                             var project = new Project($"{member.Name} Project {i + 1}",
//                                 "Description",
//                                 DateOnly.FromDateTime(DateTime.Now),
//                                 DateOnly.FromDateTime(DateTime.Now).AddMonths(3),
//                                 ProjectStatus.Active,
//                                 member);

//                             for (int j = 0; j < 5; j++)
//                             {
//                                 var ticket = new Ticket($"{project.Name} Ticket {j + 1}",
//                                     "Description",
//                                     DateOnly.FromDateTime(DateTime.Now),
//                                     DateOnly.FromDateTime(DateTime.Now).AddMonths(3),
//                                     TicketPriority.Medium,
//                                     TicketStatus.Pending,
//                                     member,
//                                     member);

//                                 for (int k = 0; k < 3; k++)
//                                 {
//                                     var comment = new Comment(member, $"{ticket.Name} comment {k + 1}");
//                                     ticket.AddComment(comment);
//                                 }

//                                 project.AddTicket(ticket);
//                             }
//                             memberProjects.Add(project);
//                         }

//                         context.Projects.AddRange(memberProjects);
//                     }
//                     await context.SaveChangesAsync();
//                 }

//             }
//             catch (Exception)
//             {
//             }
//         }

//     }
// }
