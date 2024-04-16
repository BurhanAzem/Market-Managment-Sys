using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TTS.Source.Application.Features.Tickets.Commands.Create
{
    public class TicketCreateCommandValidator : AbstractValidator<TicketCreateCommand>
    {
        public TicketCreateCommandValidator()
        {
            RuleFor(x => x.TicketCreateModel.ProjectId)
               .NotEmpty()
               .WithMessage("Project Id is required.");

            //RuleFor(x => x.TicketCreateModel.AssigneeId)
            //   .NotEmpty()
            //   .WithMessage("Assignee Id is required.");

            RuleFor(x => x.TicketCreateModel.Name)
                .NotEmpty()
                .WithMessage("Ticket name is required.");

            //RuleFor(x => x.TicketCreateModel.Description)
            //    .MaximumLength(500)
            //    .WithMessage("Ticket description cannot be longer than 500 characters.")
            //    .Unless(x => string.IsNullOrEmpty(x.TicketCreateModel.Description));

            RuleFor(x => x.TicketCreateModel.StartDate)
                .NotEmpty()
                .WithMessage("Ticket start date is required.");

            RuleFor(x => x.TicketCreateModel.DueDate)
                .NotEmpty()
                .WithMessage("Ticket due date is required.");

            //RuleFor(x => x.TicketCreateModel.TicketStatus)
            //    .IsInEnum()
            //    .WithMessage("Invalid value.")
            //    .NotNull()
            //    .WithMessage("Ticket status is required.");


            //RuleFor(x => x.TicketCreateModel.TicketPriority)
            //    .IsInEnum()
            //    .WithMessage("Invalid value.")
            //    .NotNull()
            //    .WithMessage("Ticket priority is required.");
                
        }

    }
}
