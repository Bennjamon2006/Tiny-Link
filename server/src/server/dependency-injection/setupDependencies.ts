import domains from "./domains";
import setupDomain from "./setupDomain";

export default async function setupDependencies() {
  const [Shared, ...rest] = domains;

  await setupDomain(Shared);

  await Promise.all(rest.map(setupDomain));
}
