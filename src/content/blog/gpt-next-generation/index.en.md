---
title: GPT and the next generation of means of production
description: "Starting from handicraft and automatic machines: who will own the models? Thoughts on the means of production in the GPT era."
---

Over the past half year, whenever I chat with friends, the conversation finds its way to GPT. Its knack for writing code and prose needs no introduction by now; the question that interests me more is a different one: who will end up holding a tool this powerful?

<!--truncate-->
### Handicraft and automatic machines

Let me first settle on a concept.

:::note[Wikipedia]
In political philosophy, the means of production refers to the generally necessary assets and resources that enable a society to engage in production.
:::

Recall the industrial revolution: steam engines and automatic machines replaced the hands of craftsmen, and productivity multiplied. But the machines did not belong to the weavers — they belonged to whoever could build the factory and buy the machines. Whoever holds the means of production dominates the relations of production.

Swap "machines" for "artificial intelligence", and I feel the story replaying. In the age of handicraft, the core means of production was skill; in the machine age, machines; in the age now arriving, I suspect it will be models. The internet is already shouting itself hoarse over "will AI replace us" — the question I'd rather ask is: who gets to hold the AI?

### How an AI is produced

To discuss ownership, we first need to see how an artificial intelligence gets produced. I've organized it into a pipeline, numbering each factor for later reference:

```
Data sources [1] --human curation [2]--> cleaned data
cleaned data --advanced model [3] + compute cost [4]--> the AI [5]
the AI [5] --users [6]--> value
```

In other words, producing an AI takes at least six factors: raw data [1], the labor of curating it [2], the model architecture [3], compute [4], the trained model itself [5], and the users [6] who make it produce value.

### Where things are heading

Along these factors, let me attempt a few predictions.

Data sources [1]: the deliberate pooling of human intelligence. An AI feeds on data that embodies human intelligence. In the beginning, researchers gathered it by hand: scanning books, crawling forums, collecting code repositories. Wikipedia, Q&A communities and open-source code hosts keep getting fed to models precisely because they are rich veins of human intelligence, deposited voluntarily over the years. Going forward, I suspect platforms dedicated to accumulating high-quality content will emerge — places like blogs, where people deliberately put in their best thinking. The way data gets collected will shift from machines going out to gather, to humans coming to contribute.

Curation [2] closing the loop: AI curating data. Human curation is the most expensive labor in the whole pipeline, so the natural next step is to have AI curate the training data for AI — the tool of production turning around to take part in its own production. Hidden in this self-loop are two "singularities", or rather two ceilings:

 - The inner-loop singularity: if an AI only curates and retrains on the data that already exists, it will eventually converge on "the best AI this pile of data can support". No new data, no new intelligence; the loop ends there.
 - The outer-loop singularity: to break the inner loop, you must feed the loop a constant stream of fresh data from the real world. But new data cannot enter the pipeline without human inspection and sign-off — the speed of the outer loop is capped by the speed of human control.

Users [6]: personalization. Right now everyone uses the same model, and the model knows nothing about you or me. Some readers will say: just write your personal information into the prompt. But context only goes so far — GPT-4 ships with 8K, tops out at 32K. That won't hold the full story of a person, let alone years of accumulated preferences. So my guess is that for a model to truly remember a user, the information has to be trained into the model rather than stuffed into every conversation. Lightweight fine-tuning like LoRA looks made for the job: hang a small personal add-on onto the shared model, and your habits, your field, your turns of phrase all live inside it.

Models [3]: better architectures. Improvements here won't stop; I'll skip the details — their significance comes up in the next section.

### Means of production

Now back to the opening question: the model [5], as a means of production — who owns it?

On the table is an old script: collective/public ownership versus the capitalists. The cost of training a large model — oceans of data, oceans of compute — naturally favors capital: only big companies can foot the bill, so the models stay in their hands, and the rest of us become factor [6], producing value on someone else's machine. It looks an awful lot like the opening act of the factory age. The personalization add-on from the last section is only a stopgap, too: the add-on is yours, but the base model is still theirs.

The picture I hold in my mind is this: everyone able to independently train and own a model [5] of their own — training it yourself, feeding your own AI with your own data, keeping the means of production in your own hands. It sounds absurd — the compute burned to train a model today is beyond an individual's wildest reach. But I can see two roads.

The road of going it alone: tear down the compute barrier. AI practitioners drive down the computation required [3] with leaner architectures and training methods, so training stops being the exclusive privilege of giants; hardware makers drive down the cost of compute [4]. My guess is that personal training will still call for dedicated hardware — but hardware can become an ordinary household object, the way routers did. The soft router humming quietly in my dorm, running a proxy and backups, looks like nothing high-tech to anyone — yet it is a genuine server through and through. AI hardware can walk the same path.

The road of joining together: connect countless machines that are each "not enough". Distributed computing is not a new idea — readers may have heard of SETI@home and Folding@home, where tens of millions of home computers once joined up to hunt for alien signals and fold proteins. The same idea can train a publicly owned model: everyone chips in compute, everyone contributes data (remember the "deliberate pooling of human intelligence" above?), and the model belongs to everyone. Come to think of it, isn't that the old saying — workers of the world, unite!

Routers took roughly twenty years to reach every household. When the "router" of AI will arrive, or whether it will arrive at all, I don't know. But I hope that when it does, the model running inside belongs to us.

These are my rough thoughts on GPT and the next generation of means of production. If you see it differently, leave a comment and let's discuss.

### References

Means of production: https://en.wikipedia.org/wiki/Means_of_production

----

Postscript (July 2026): The body of this post was not written by the 2023 me. That year I left behind only an outline, untouched for three years; the text was drafted by an AI (Fable 5) working from that outline and my recollections, then revised by me. The views, the numbering system and the two roads all come from the 2023 outline, but the prose is today's — so please don't use this post to judge which of my predictions held up; the writing perspective sits three years removed.
