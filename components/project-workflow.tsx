export function ProjectWorkflow({ steps, label }: { steps: string[]; label: string }) {
  return (
    <ol className="project-workflow" aria-label={label}>
      {steps.map((step, index) => (
        <li key={step}>
          <span>{step}</span>
          {index < steps.length - 1 ? <span aria-hidden="true">→</span> : null}
        </li>
      ))}
    </ol>
  );
}
