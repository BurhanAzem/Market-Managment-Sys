using FluentValidation;

namespace TTS.Source.Application.Features.Projects.Commands.Edit
{
    public class ProjectEditCommandValidator : AbstractValidator<ProjectEditCommand>
    {
        public ProjectEditCommandValidator()
        {
            RuleFor(x => x.ProjectEditModel.Name)
                .NotEmpty()
                .WithMessage("Project name is required.")
                .MaximumLength(50)
                .WithMessage("Project name cannot be longer than 50 characters.");

            RuleFor(x => x.ProjectEditModel.Description)
                .NotEmpty()
                .WithMessage("Project description is required.")
                .MaximumLength(500)
                .WithMessage("Project description cannot be longer than 500 characters.");

            RuleFor(x => x.ProjectEditModel.StartDate)
                .NotEmpty()
                .WithMessage("Project start date is required.");

            RuleFor(x => x.ProjectEditModel.EndDate)
                .NotEmpty()
                .WithMessage("Project end date is required.");

            RuleFor(x => x.ProjectEditModel.ProjectStatus)
                .NotNull()
                .WithMessage("Project status is required.");

            RuleFor(x => x.ProjectEditModel.EndDate)
                .GreaterThan(x => x.ProjectEditModel.StartDate)
                .WithMessage("End date must be after the start date.");
        }
    }
}
