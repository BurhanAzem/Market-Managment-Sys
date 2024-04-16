using FluentValidation;

namespace TTS.Source.Application.Features.Projects.Commands.Create
{
    public class ProjectCreateCommandValidator : AbstractValidator<ProjectCreateCommand>
    {
        public ProjectCreateCommandValidator()
        {
            RuleFor(x => x.ProjectCreateModel.Name)
                .NotEmpty()
                .WithMessage("Project name is required.")
                .MaximumLength(50)
                .WithMessage("Project name cannot be longer than 50 characters.");

            RuleFor(x => x.ProjectCreateModel.Description)
                .MaximumLength(500)
                .WithMessage("Project description cannot be longer than 500 characters.")
                .Unless(x => string.IsNullOrEmpty(x.ProjectCreateModel.Description));

            RuleFor(x => x.ProjectCreateModel.StartDate)
                .NotEmpty()
                .WithMessage("Project start date is required.");

            RuleFor(x => x.ProjectCreateModel.EndDate)
                .NotEmpty()
                .WithMessage("Project end date is required.");

            RuleFor(x => x.ProjectCreateModel.ProjectStatus)
                .NotNull()
                .WithMessage("Project status is required.");
        }
    }
}
