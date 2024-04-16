using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TTS.Source.Application.Features.Tickets.Commands.Edit
{
    public class TicketEditCommandValidator : AbstractValidator<TicketEditCommand>
    {
        public TicketEditCommandValidator() {
            RuleFor(x => x.TicketEditModel.ProjectId)
              .NotEmpty()
              .WithMessage("Project Id is required.");

            //RuleFor(x => x.TicketEditModel.AssigneeId)
            //   .NotEmpty()
            //   .WithMessage("Assignee Id is required.");

            RuleFor(x => x.TicketEditModel.Name)
                .NotEmpty()
                .WithMessage("Ticket name is required.");

            //RuleFor(x => x.TicketEditModel.Description)
            //    .MaximumLength(500)
            //    .WithMessage("Ticket description cannot be longer than 500 characters.")
            //    .Unless(x => string.IsNullOrEmpty(x.TicketEditModel.Description));

            RuleFor(x => x.TicketEditModel.StartDate)
                .Must(date => date != default(DateOnly))
                .WithMessage("Ticket start date is required.");


            RuleFor(x => x.TicketEditModel.DueDate)
                .Must(date => date != default(DateOnly))
                .WithMessage("Ticket due date is required.");


            //RuleFor(x => x.TicketEditModel.TicketStatus)
            //    .NotEmpty()
            //    .WithMessage("Ticket status is required.")
            //    .IsInEnum()
            //    .WithMessage("Invalid value.");

            //RuleFor(x => x.TicketEditModel.TicketPriority)
            //    .NotEmpty()
            //    .WithMessage("Ticket Priority is required.")
            //    .IsInEnum()
            //    .WithMessage("Invalid value.");

        }
    }
}
