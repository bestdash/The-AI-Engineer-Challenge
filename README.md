<p align = "center" draggable=”false” ><img src="https://github.com/AI-Maker-Space/LLM-Dev-101/assets/37101144/d1343317-fa2f-41e1-8af1-1dbb18399719" 
     width="200px"
     height="auto"/>
</p>


## <h1 align="center" id="heading"> 👋 Welcome to the AI Engineer Challenge</h1>

## 🤖 Your First Vibe Coding LLM Application

> If you are a novice, and need a bit more help to get your dev environment off the ground, check out this [Setup Guide](docs/GIT_SETUP.md). This guide will walk you through the 'git' setup you need to get started.

> For additional context on LLM development environments and API key setup, you can also check out our [Interactive Dev Environment for LLM Development](https://github.com/AI-Maker-Space/Interactive-Dev-Environment-for-AI-Engineers).

In this repository, we'll walk you through the steps to create a LLM (Large Language Model) powered application with a vibe-coded frontend!

Are you ready? Let's get started!

<details>
  <summary>🖥️ Accessing "gpt-4.1-mini" (ChatGPT) like a developer</summary>

1. Head to [this notebook](https://colab.research.google.com/drive/1sT7rzY_Lb1_wS0ELI1JJfff0NUEcSD72?usp=sharing) and follow along with the instructions!

2. Complete the notebook and try out your own system/assistant messages!

That's it! Head to the next step and start building your application!

</details>


<details>
  <summary>🏗️ Forking & Cloning This Repository</summary>

Before you begin, make sure you have:

1. 👤 A GitHub account (you'll need to replace `YOUR_GITHUB_USERNAME` with your actual username)
2. 🔧 Git installed on your local machine
3. 💻 A code editor (like Cursor, VS Code, etc.)
4. ⌨️ Terminal access (Mac/Linux) or Command Prompt/PowerShell (Windows)
5. 🔑 A GitHub Personal Access Token (for authentication)

Got everything in place? Let's move on!

1. Fork [this](https://github.com/AI-Maker-Space/The-AI-Engineer-Challenge) repo!

     ![image](https://i.imgur.com/bhjySNh.png)

1. Clone your newly created repo.

     ``` bash
     # First, navigate to where you want the project folder to be created
     cd PATH_TO_DESIRED_PARENT_DIRECTORY

     # Then clone (this will create a new folder called The-AI-Engineer-Challenge)
     git clone git@github.com:<YOUR GITHUB USERNAME>/The-AI-Engineer-Challenge.git
     ```

     > Note: This command uses SSH. If you haven't set up SSH with GitHub, the command will fail. In that case, use HTTPS by replacing `git@github.com:` with `https://github.com/` - you'll then be prompted for your GitHub username and personal access token.

2. Verify your git setup:

     ```bash
     # Check that your remote is set up correctly
     git remote -v

     # Check the status of your repository
     git status

     # See which branch you're on
     git branch
     ```

     <!-- > Need more help with git? Check out our [Detailed Git Setup Guide](docs/GIT_SETUP.md) for a comprehensive walkthrough of git configuration and best practices. -->

3. Open the freshly cloned repository inside Cursor!

     ```bash
     cd The-AI-Engineering-Challenge
     cursor .
     ```

4. Check out the existing backend code found in `/api/index.py`

</details>

<details>
  <summary>⚙️ Backend Setup with uv</summary>

1. Install the [`uv`](https://github.com/astral-sh/uv) package manager (`pip install uv`). `uv` will download and manage Python 3.12 for you the first time you run a project command.
2. From the project root, install dependencies with `uv sync`. This creates `.venv/` (and fetches Python 3.12 automatically if needed).
3. Set your OpenAI API key in the shell before running the server, for example `export OPENAI_API_KEY=sk-...`.
4. Start the backend directly from the project root with `uv run uvicorn api.index:app --reload`. The server will run on `http://localhost:8000` with auto-reload enabled for development.
5. Additional backend details live in `api/README.md`.

</details>

<details>
  <summary>🔥Setting Up for Vibe Coding Success </summary>

While it is a bit counter-intuitive to set things up before jumping into vibe-coding - it's important to remember that there exists a gradient betweeen AI-Assisted Development and Vibe-Coding. We're only reaching *slightly* into AI-Assisted Development for this challenge, but it's worth it!

1. Check out the rules in `.cursor/rules/` and add theme-ing information like colour schemes in `frontend-rule.mdc`! You can be as expressive as you'd like in these rules!
2. We're going to index some docs to make our application more likely to succeed. To do this - we're going to start with `CTRL+SHIFT+P` (or `CMD+SHIFT+P` on Mac) and we're going to type "custom doc" into the search bar. 

     ![image](https://i.imgur.com/ILx3hZu.png)
3. We're then going to copy and paste `https://nextjs.org/docs` into the prompt.

     ![image](https://i.imgur.com/psBjpQd.png)

4. We're then going to use the default configs to add these docs to our available and indexed documents.

     ![image](https://i.imgur.com/LULLeaF.png)

5. After that - you will do the same with Vercel's documentation. After which you should see:

     ![image](https://i.imgur.com/hjyXhhC.png) 

</details>

<details>
  <summary>😎 Vibe Coding a Front End for the FastAPI Backend</summary>

1. Use `Command-L` or `CTRL-L` to open the Cursor chat console. 

2. Set the chat settings to the following:

     ![image](https://i.imgur.com/LSgRSgF.png)

3. Ask Cursor to create a frontend for your application. Iterate as much as you like!

4. Run the frontend using the instructions Cursor provided. 

> NOTE: If you run into any errors, copy and paste them back into the Cursor chat window - and ask Cursor to fix them!

> NOTE: You have been provided with a backend in the `/api` folder - please ensure your Front End integrates with it!

</details>

<details>
  <summary>🚀 Deploying Your First LLM-powered Application with Vercel</summary>

1. Ensure you have signed into [Vercel](https://vercel.com/) with your GitHub account.

2. Ensure you have `npm` (this may have been installed in the previous vibe-coding step!) - if you need help with that, ask Cursor!

3. Run the command:

     ```bash
     npm install -g vercel
     ```

4. Run the command:

     ```bash
     vercel
     ```

5. Follow the in-terminal instructions. (Below is an example of what you will see!)

     ![image](https://i.imgur.com/D1iKGCq.png)

6. Once the build is completed - head to the provided link and try out your app!

> NOTE: Remember, if you run into any errors - ask Cursor to help you fix them!

### Vercel Link to Share

You'll want to make sure you share you *domains* hyperlink to ensure people can access your app!

![image](https://i.imgur.com/mpXIgIz.png)

> NOTE: Test this is the public link by trying to open your newly deployed site in an Incognito browser tab!

</details>

<details>
     <summary>🧪 Vibe Check Your LLM App</summary>

### 🤔 What is a Vibe Check?

Now that you’ve built and deployed your first LLM-powered application, it’s time to evaluate it.

In this section, you’ll run a **“vibe check”** — a lightweight, practical way to test how well your application performs across common tasks.

Think of it as a **first pass to catch obvious issues** before deeper evaluation.

> 💡 You will complete this directly in this README. 

---

## 🏗️ Activity #1: General Capability Vibe Check

Run the following prompts through your app.

For each prompt Identify what capability is being tested (e.g., *summarization ability, reasoning, creativity*)

---

**1. Prompt:**  
Explain the concept of object-oriented programming in simple terms to a complete beginner.  
**Aspect Tested:** summarization ability

**Response:**  
Think of object-oriented programming like building with LEGO blocks instead of writing out every individual instruction.

Imagine you're creating a video game with different characters. Instead of writing separate code for each character's running, jumping, and talking abilities every single time, you'd create a "blueprint" called a class. This blueprint says "all characters can run, jump, and talk" and defines how those actions work.

Then, whenever you need a specific character—say, a wizard or a knight—you create an "object" based on that blueprint. The wizard object and knight object both know how to run and jump because they follow the same blueprint, but they might do those things differently. The wizard might cast a spell while running, while the knight carries a shield.

The magic here is reusability and organization. You write the rules once, and everything that follows that blueprint automatically gets those abilities. If you realize all characters should also be able to eat food, you just add that to the blueprint, and suddenly every character—past and future—can eat food.

It's really about mimicking how the real world works. Real objects have properties (a character has health, a name, a level) and behaviors (they can move, attack, defend). Object-oriented programming lets you model your code the same way, making it easier to think about, write, and maintain.

Does that make sense? Want me to clarify any part of it?

---

**2. Prompt:**  
Read the following paragraph and provide a concise summary of the key points…  
**Aspect Tested:**  reasoning

**Response:**  
I'd love to help you summarize that paragraph, but I don't see one in your message. Could you go ahead and share the text you'd like me to work with? Just paste it in whenever you're ready, and I'll give you a clear, concise summary of the main points.

---

**3. Prompt:**  
Write a short, imaginative story (100–150 words) about a robot finding friendship in an unexpected place.  
**Aspect Tested:**  creativity

**Response:**  
The Rusty Companion
Unit-7 was designed to sort recycled materials, but on Tuesday it developed a glitch—it started humming old lullabies instead of beeping alerts.

The warehouse was empty except for a stray cat who'd nested in the cardboard section. The cat didn't flee from the mechanical whirring. Instead, it settled near Unit-7's base, purring.

Each shift, the robot hummed while the cat listened. Unit-7 learned that companionship wasn't in its programming, but it was in the quiet moments between tasks. The cat brought the robot bottle caps and shredded paper—tiny gifts.

When the technician arrived to fix the glitch, Unit-7's sensors flickered in what could only be described as distress. The cat meowed, blocking the repair panel.

The technician smiled and left the humming robot alone.

Some friendships don't need to be fixed.

---

**4. Prompt:**  
If a store sells apples in packs of 4 and oranges in packs of 3, how many packs of each do I need to buy to get exactly 12 apples and 9 oranges?  
**Aspect Tested:**  reasoning

**Response:**  
This one's pretty straightforward! For the apples, you'd need 3 packs since 3 × 4 = 12. And for the oranges, you'd need 3 packs since 3 × 3 = 9. So you're looking at grabbing 3 packs of each—nice and easy!

---

**5. Prompt:**  
Rewrite the following paragraph in a professional, formal tone…  
**Aspect Tested:**  context, memory

**Response:**  
I'd be happy to help, but I don't see a paragraph included in your message. Could you paste the text you'd like me to rewrite in a more formal, professional tone? Once you share it, I'll give it a polished revision for you.

---

### ❓Question #1

Do the answers appear to be correct and useful?

**Your Answer:**  
<!-- Write your answer here -->

---

## 🏗️ Activity #2: Personal Use Vibe Check

Now test your app with **real-world prompts that are relevant to your use case**.

---

**Prompt:**  
<!-- Your prompt -->

**Result:**  
<!-- App response -->

---

**Prompt:**  
<!-- Your prompt -->

**Result:**  
<!-- App response -->

---

**Prompt:**  
<!-- Your prompt -->

**Result:**  
<!-- App response -->

---

### ❓Question #2

Are the vibes of your assistant aligned with your expectations? Why or why not?

**Your Answer:**  
<!-- Write your answer here -->

---

## 🏗️ Activity #3: Capability Gaps Vibe Check

Now test your app with prompts that require **capabilities it may not have yet**, such as:
- Real-time data
- Memory
- External tools

Examples:
- “What does my schedule look like tomorrow?”
- “What time should I leave for the airport?”

---

**Prompt:**  
my trainee didn't do anything for 3 weeks, i verified the project folder in framer there is nothing. I asked him if he understands the difference between variable and variant, he couldn't reply. I am angry and frustrated.

**Result:**  
I hear you. That's a legitimate frustration.
Let me offer a perspective that might help you move forward productively:

What this signals
Knowledge gap is real - not understanding variables vs. variants suggests foundational gaps
But lack of output ≠ lack of trying - there could be multiple causes: overwhelm, confusion about where to start, not knowing how to ask for help, or yes, lack of effort
Before acting on anger, consider:
What might actually be happening:

Is he stuck and embarrassed to say so?
Does he understand the goal or just the task?
Has he asked for help and felt dismissed?
Is this a learning pace issue or motivation issue?
What to do now:
Call a focused conversation - not in frustration mode. "I noticed no progress. Help me understand what's going on."

Listen first - before explaining what he should have done

Get specific about the gap:

"Let's clarify variables vs variants together"
Show concrete examples
Have him explain it back to you
Reset expectations clearly:

Weekly check-ins (not just at 3 weeks)
Smaller milestones
Clear deliverables
Decide: Is this trainee-coachable, or are they not a fit?

The anger is valid. But your next move determines if this becomes a coaching moment or confirmation of a hiring mistake.

What does your gut tell you about their potential?

---

**Prompt:**  
well you mental coaches are useless, you will be asking me bunch of questions and validating me all the time, that is it, right?

**Result:**  
Fair point—I can see why that would feel shallow or like a waste of time.

You're right that some coaching falls into that trap: surface-level questions and empty validation without actually moving anything.

Here's what I'd actually do differently: I won't pretend I have all your context or answers. I also won't just cheerfully validate every thought you have. That's not useful.

What I can do is:

Push back if something doesn't make sense (respectfully)
Help you think through actual obstacles instead of around them
Point out patterns I notice without being preachy about it
Be direct about the gap between what you say you want and what you're actually doing
Help you move from venting to clarity to action—or admit when something's genuinely stuck
None of that requires me to know your whole life story upfront.

So: what's actually on your mind? And what would actually be useful to you right now—because if it's not this, I'd rather you know that upfront than waste your time.

**Prompt:**  
Ok. what are most common API frameworks for dev?

**Result:**  
Most Common API Frameworks by Language
JavaScript/Node.js
Express - Lightweight, flexible, most popular
Fastify - High performance, modern
NestJS - Full-featured, TypeScript-first, great for larger projects
Hapi - Robust, enterprise-friendly
Python
FastAPI - Modern, fast, excellent docs
Django REST Framework - Full-featured, batteries-included
Flask - Lightweight, minimal
Pyramid - Flexible middle ground
Java
Spring Boot - Industry standard, comprehensive
Quarkus - Cloud-native, lightweight
Micronaut - Fast startup, low memory
Go
Gin - Fast, minimalist
Echo - Lightweight, high performance
Chi - Idiomatic Go routing
C#/.NET
ASP.NET Core - Microsoft's powerful framework
Minimal APIs - Newer, lightweight option
PHP
Laravel - Popular, developer-friendly
Slim - Lightweight microframework
Quick tip: Your choice depends on:

Speed needs → Go, Fastify, Gin
Rapid development → FastAPI, Laravel, NestJS
Enterprise scale → Spring Boot, ASP.NET Core
Learning/small projects → Express, Flask, Chi
What's your use case? I can give more specific recommendations! 💪
---

### ❓Question #3

What are some limitations of your application?

**Your Answer:**  
- it doesn't take context of the previous response into account
- it doesn't have any memory of current or previous chats
- it is too verbouse (to my taste)
- it doesn't always answer from mental coach perspective

---

## 🚀 (Optional) Improve Your App

Based on your vibe check, try improving your application:
- Adjust your prompt
- Change the model
- Add features

Then rerun your vibe check and document:

---

**Adjustments Made:**  
Asked cursor to come up with the plan following my observations. Here is the summany and what I skipped for now.

+ In-session context: Send the whole current conversation (user + assistant turns) to the model each time so replies can follow what was already said.
+ Cross-session memory: Skipped for now (no DB, no encrypted logs, no “remember last week”).
+ Less verbose: Steer with system instructions (default short answers) and a lower max_tokens.
+ Coach voice: A single, explicit Ember system prompt (persona, boundaries, tone) so answers stay in character instead of drifting into generic-assistant mode.

What we actually changed (implemented)
- API (api/index.py): POST /api/chat now expects { "messages": [ { "role": "user"|"assistant", "content": "..." }, ... ] }. The server strips any leading assistant-only turns (so the thread starts with a user message, as Anthropic requires), keeps at most 48 turns from the tail, validates that the last turn is from the user, and passes that list to Claude with a longer Ember system prompt (brief by default, coach stance, light “not therapy / crisis” guidance). max_tokens reduced from 1024 → 512.

-Frontend (MentalCoachChat.tsx): On each send, it builds the transcript from existing UI messages + the new user message (buildApiTranscript) and POSTs messages, not a lone message.

**Results:**  
well context improved - everything conversation became meaningful, it doesn't change the role, tone and voice is more consistent. 

Ember
Hi — I'm Ember, and I'm here with you. What's on your mind today? Share as much or as little as feels right.

my trainee didn't do anything for 3 weeks, i verified the project folder in framer there is nothing. I asked him if he understands the difference between variable and variant, he couldn't reply. I am angry and frustrated.

Ember
That's a solid reason to feel frustrated—three weeks with nothing to show, plus a gap on something pretty fundamental to the work. The anger makes sense.

Before you decide what to do next, I'm curious: do you know why he hasn't moved forward? Is it unclear expectations, lack of confidence with the tools, overwhelm, or something else entirely?

well you mental coaches are useless, you will be asking me bunch of questions and validating me all the time, that is it, right?

Ember
Fair point—I get the skepticism. You're right that I'm asking questions, and yeah, I'd validate you too because your frustration is real.

But here's the difference: I'm not here to make you feel better and send you off. I'm asking because what you do next matters, and it depends on what's actually going on with him. Is he lost? Intimidated? Disengaged? Those need different moves from you.

So—what's your best guess about why he went silent for three weeks?

Ok. what are most common API frameworks for dev?

Ember
Hold on—are you asking because your trainee needs to learn API frameworks, or are you shifting gears entirely?

I can rattle off tech facts, but that's not really my lane. If this is about what to teach him next, let's first figure out what's blocking him now with the basics.

What's pulling your attention right now?

---

## 📦 Submission Instructions

1. Complete this section directly in your README
2. Commit and push your changes to GitHub
3. **repo link** - https://github.com/bestdash/The-AI-Engineer-Challenge.git
5. Vercel App link: https://mental-coach-ai-challenge.vercel.app/









</details>

### 🎉 Congratulations! 

You just deployed your first LLM-powered application! 🚀🚀🚀 Get on linkedin and post your results and experience! Make sure to tag us at @AIMakerspace!

Here's a template to get your post started!

```
🚀🎉 Exciting News! 🎉🚀

🏗️ Today, I'm thrilled to announce that I've successfully built and shipped my first-ever LLM using the powerful combination of , and the OpenAI API! 🖥️

Check it out 👇
[LINK TO APP]

A big shoutout to the @AI Makerspace for all making this possible. Couldn't have done it without the incredible community there. 🤗🙏

Looking forward to building with the community! 🙌✨ Here's to many more creations ahead! 🥂🎉

Who else is diving into the world of AI? Let's connect! 🌐💡

#FirstLLMApp 
```
