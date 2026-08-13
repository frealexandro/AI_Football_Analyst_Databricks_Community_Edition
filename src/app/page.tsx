import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">AI Hardware Builder</h1>
          <div className="flex gap-4">
            <Button variant="ghost">Models</Button>
            <Button variant="ghost">GPUs</Button>
            <Button variant="ghost">Builder</Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <section className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-5xl font-bold mb-6">
            Build the right machine for your AI.
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Tell us what AI model or workload you want to run, your budget and your priorities. 
            We'll calculate the hardware, performance and best available deals.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Build my AI machine</Button>
            <Button size="lg" variant="outline">Explore AI models</Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Card>
            <CardHeader>
              <CardTitle>1. Choose Your Model</CardTitle>
              <CardDescription>
                Select the AI model you want to run or tell us your workload.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>2. Set Your Budget</CardTitle>
              <CardDescription>
                Define your budget and priorities: price, performance, or efficiency.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>3. Get Your Build</CardTitle>
              <CardDescription>
                Receive optimized hardware recommendations with performance estimates and prices.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        <section>
          <h3 className="text-3xl font-bold mb-8 text-center">Popular AI Models</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Llama 4", "Qwen 3 235B", "DeepSeek V3", "Mistral Large 2"].map((model) => (
              <Card key={model}>
                <CardHeader>
                  <CardTitle className="text-lg">{model}</CardTitle>
                  <CardDescription>View requirements →</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>AI Hardware Builder - Find the perfect hardware for your AI workloads</p>
        </div>
      </footer>
    </div>
  );
}
