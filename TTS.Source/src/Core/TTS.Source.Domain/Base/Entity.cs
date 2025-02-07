using System.Collections.Immutable;

namespace TTS.Source.Domain.Base
{
    public abstract class BaseAggregateRoot<TKey> : BaseEntity<TKey>, IAggregateRoot where TKey : struct
    {
        protected BaseAggregateRoot()
        {
            _events = new List<IDomainEvent>();
        }

        private readonly IList<IDomainEvent> _events;

        public IReadOnlyCollection<IDomainEvent> Events => _events.ToImmutableArray();

        public void ClearEvents()
        {
            _events.Clear();
        }

        protected void AddEvent<TE>(TE @event) where TE : IDomainEvent
        {
            _events.Add(@event);
        }
    }

    public abstract class BaseEntity<TKey> where TKey : struct
    {
        public TKey Id { get; protected set; } = default;

        public override bool Equals(object? obj)
        {
            if (obj is BaseEntity<TKey> entity)
            {
                return GetType() == entity.GetType() && EqualityComparer<TKey>.Default.Equals(Id, entity.Id);
            }
            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(this.GetType(), Id);
        }
        public static bool operator ==(BaseEntity<TKey>? entity1, BaseEntity<TKey>? entity2)
        {
            if (ReferenceEquals(entity1, null))
            {
                return ReferenceEquals(entity2, null);
            }

            return entity1.Equals(entity2);
        }

        public static bool operator !=(BaseEntity<TKey>? entity1, BaseEntity<TKey>? entity2)
        {
            return !(entity1 == entity2);
        }
    }
}
