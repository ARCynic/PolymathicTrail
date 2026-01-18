import logo2 from "../assets/logo_forest.png";
import logos from "../assets/logo_simsea.png";
import log from "../assets/loooo.png"
import poker from "../assets/poker01.png"
import satire from "../assets/stamp_satire.png"
/**
 * @typedef {"text"|"image"|"contact"} SneakpeekVariant
 *
 * @typedef {Object} SneakpeekItem
 * @property {string} id
 * @property {SneakpeekVariant} variant
 * @property {string} title
 * @property {string} summary
 * @property {string[]} [tags]
 * @property {string} [img]          // only for image/contact cards
 * @property {number} height         // layout hint for Masonry
 * @property {string} [to]           // internal route (ONLY if you want click navigation)
 * @property {string} [glare]        // optional preset key if you want different glare styles later
 */

/** @type {SneakpeekItem[]} */
export const RESEARCH_SNEAKPEEK = [
{
  id: "dels-architecture-of-regulation",
  variant: "text",
  title: "The Architecture of Regulation (DELS)",
  summary:
    "DELS is a practical lens for understanding how living, learning, or organized systems maintain feedback regulation despite fluctuating load and limited recovery capacity.",
  tags: [
    "DELS",
    "Systems-Thinking",
    "Nested-Equilibrium",
    "Sacrificial-Failure",
    "Organizational-Design",
  ],
  height: 1900,
  detailRead: `The Architecture of Regulation (DELS) is a way of looking at any living, learning, or organised system as something that is constantly juggling three things: what it needs to keep going, what the world is throwing at it, and how it adapts without quietly losing itself. At the centre is a simple idea: every system has a few key state variables that really matter for its survival or functioning—things like energy, health, trust, accuracy, or stability. As long as those stay within a certain functional range, the system is “okay”: a person can work, a team can cooperate, an AI model can give sensible answers, a hospital can treat patients. The world around that system is not quiet; it keeps sending load—tasks to do, signals to process, decisions to make, conflicts to resolve, noise, uncertainty, and pressure. The system has a limited regulatory capacity: attention, time, spare energy, recovery mechanisms, monitoring, and the ability to change course. Regulation is everything the system does to keep its key variables inside that viable range while the load rises and falls. In a person, that includes sleep, breaks, saying no, asking for help, simplifying problems, updating beliefs. In an organisation, it’s feedback, escalation channels, quality checks, buffers, backup plans. In an AI system, it’s safety layers, training updates, monitoring for drift, or refusing unsafe requests.

DELS focuses on what happens over time, not just in one moment. If the load is occasionally high but there is enough recovery and correction, the system can return to a healthy baseline. If the load is regularly higher than the system’s capacity to regulate, one of two things tends to happen. Either the system is hit by a sudden shock—a crisis, a massive error, a failure of a critical component—and some key variable crosses its critical boundary quickly (a breakdown, a burnout, a catastrophic bug, an institutional collapse). Or the system slowly drifts: it adapts to stress by quietly shifting what it treats as “normal”—working while exhausted, ignoring small errors, accepting distorted data, tolerating unfairness, redefining risk. On the surface things still “function”, but the baseline has moved closer to the edge. DELS helps you put names and structure to that: what are the key variables, what counts as normal, what mechanisms watch for overload, what patterns of behaviour suggest drift, and where the real tipping points are.

The architecture also explicitly recognises multiple levels. A larger environment (an economy, a platform, an ecosystem) can remain in its own kind of equilibrium while sacrificing some of its parts. A company can keep its numbers stable by burning out teams. A social network can keep “engagement” high while some users’ mental health degrades. A hospital can look efficient on paper while certain wards are permanently overloaded. DELS describes this as nested equilibrium and sacrificial failure: the higher level stays stable by letting some components fail or degrade. The same logic appears inside a person: to keep functioning, they might sacrifice sleep, relationships, creativity, or long-term health. The architecture encourages you to ask very directly: what is being kept stable, and at whose cost?

Finally, DELS is meant to be usable: it gives you a checklist when you design or audit a system. What are the key state variables we actually care about here? How do we measure them, even roughly? Where is the load coming from, and how does it fluctuate? What explicit mechanisms exist to reduce load, recover, or adapt—rest days, buffers, safety margins, honest feedback channels? How do we detect early signs of drift—normalising errors, hiding bad news, gaming metrics? And if something must fail, can we design sacrificial layers that absorb damage without destroying the core (like fuses, sandboxed modules, or non-critical projects that can be cut without harming people)? In that sense, DELS is less a single theory and more a practical lens: a way to see systems as living, finite regulators trying to stay themselves in moving conditions, and to design them so they bend intelligently instead of snapping or quietly deforming beyond recognition.`,
},
{
  id: "dels-complex-adaptive-systems",
  variant: "text",
  title: "Complex Adaptive Systems",
  summary:
    "A way of designing complex adaptive systems: governing feedback, load and drift, absorbing failure, and restoring recovery.",
  tags: [
    "DELS",
    "Complex Adaptive Systems",
    "Load",
    "Feedback",
    "Drift",
    "Recovery",
  ],
  height: 2100,
  detailRead: `In a complex adaptive system—whether it’s a classroom, a hospital, an economy, a social network, or an AI ecosystem—nothing important happens in straight lines. Many small parts act semi-independently, learn over time, and constantly respond to each other. DELS (Dynamic-Equilibrium Learning/Load/Regulation System) is a way of looking at such systems that focuses on one simple question: how do they keep functioning under pressure without quietly drifting into failure? Instead of treating a system as a black box that is either “working” or “broken,” DELS asks: what are its key state variables (like health, energy, trust, error rate, calibration, or available resources), what counts as their functional range, and what kinds of feedback and regulation keep those variables inside that range over time. In a complex adaptive system, you rarely get perfect control; you get bounded capacity and noisy information. DELS starts from that: load is everything that pushes the system—tasks, conflicts, uncertainty, noise, speed, volume; regulatory capacity is everything that helps it adapt—learning, buffering, rest, redesign of workflows, escalation, refusal. When load stays within what regulation can handle, key variables stay in bounds and the system is in dynamic equilibrium: not frozen, but able to keep doing its main job without degrading.

When load repeatedly outpaces regulation—too many tasks, too little recovery, too much noise, too many misaligned incentives—the system doesn’t usually explode right away; it drifts. Tolerances are loosened (“this level of overload is normal now”), warning signs get reinterpreted as background, and shortcuts become standard practice. DELS gives language to that drift: the system remains outwardly live, but its internal variables are edging closer to critical thresholds where small shocks can trigger cascading failures. This is where the “complex adaptive” part matters: each component (a nurse, a model, a teacher, a team, a microservice) is adapting locally to stay viable—taking shortcuts, ignoring low-priority errors, triaging attention—but those local survival strategies can push extra load onto others and reshape the whole system’s behaviour. DELS highlights that nested equilibrium: the hospital might be “stable” while individual staff are burning out; a platform might be “growing” while its safety teams quietly fail; an AI stack might keep shipping while its feedback loops become less and less grounded in reality. In that lens, a complex adaptive system is not just a collection of agents; it is a web of coupled regulators, each with its own state, capacity, and blind spots.

DELS encourages you to map that web explicitly: who is monitoring what, with which signals, under what time pressure; where the system is relying on “someone will catch it”; where recovery is genuine (load is reduced, variables return to healthy ranges) versus cosmetic (metrics are massaged, language is softened, problems are relabeled). It also gives you a way to think about sacrificial failure: sometimes the only way a large system stays in equilibrium is by letting some part fail—closing a department to save the organisation, abandoning a product line to save the company, withdrawing a model to protect a brand, letting a relationship or role end so the person can stay sane. In a complex adaptive system, this is not a bug; it is one of the few ways to re-balance when gentle adjustments are no longer enough. Seen this way, DELS in complex adaptive systems is not a mystical theory; it is a disciplined way of asking: what are the variables that actually matter for viability here, how are they being pushed, who is trying to regulate them, with what limits, and where is drift quietly rewriting the rules while everyone is busy. Once you can name those patterns, you have a better chance of designing healthier feedback, smarter buffers, and more honest failure modes—before collapse is the only teacher left.`,
},
{
  id: "ergonomics-of-attention-dels",
  variant: "text",
  title: "Ergonomics of Attention",
  summary:
    "Designing self-study tools around ergonomics of attention: that protect attention and keep effort sustainable by adapting pace and difficulty",
  tags: ["education", "learning-design", "DELS", "AI-tutoring", "cognitive-load", ],
  height: 920,
  detailRead: `Ergonomics of attention treats a student’s focus the way a skilled gardener treats a delicate plant: as something living, responsive, and in need of careful tending to thrive. In most classrooms and online courses, we design for content first and attention second. We ask, “What material must I cover?” instead of, “What can a real human brain process, recover from, and return to tomorrow?” When you flip that question, you move from curriculum alone into regulation, and that’s where a framework like DELS becomes useful.

A student can be understood as a feedback-regulated system with shifting state variables: alertness, mental energy, frustration, confidence, and working-memory load. These rise and fall across the day depending on sleep, stress, interest, and presentation. When those variables stay within a functional range, the student can sustain attention, absorb new ideas, and connect them to what they already know. When they’re pushed outside that range—too much information, too fast, under too much pressure—attention collapses, and learning stops even if the student is still present.

The goal, then, is design: shaping tasks, tools, and schedules so those variables remain in a healthy band as often as possible. DELS helps formalise that goal. It frames learning as a dynamic balance between load (what the environment demands) and regulatory capacity (what the student can handle and recover from). Load isn’t just difficult content. It also includes time pressure, multitasking, noisy environments, unclear instructions, and emotional strain. Capacity is influenced by prior knowledge, sleep, motivation, and the supports built into the system: breaks, feedback, scaffolding, and clear explanations.

An AI tutor or classroom assistant designed around this idea wouldn’t only deliver exercises and grade answers. It would act as a lightweight regulatory layer around attention. Over time, it could track simple signals: how long a student has worked without a pause, how often they repeat the same mistake, how quickly they respond, where they hesitate, and when they begin guessing. From these signals it could estimate current load and adjust the learning environment: slow the pace, reduce problem complexity, change task type, insert a short review, or suggest a brief break. The aim is not to make everything easy, but to keep the student in the narrow zone where effort is real and productive rather than overwhelming.

Because DELS is explicit about drift and breakdown, it also supports longer-term thinking. A student who repeatedly works through exhaustion to meet deadlines may look “hard-working” in the moment, but gradually shifts their baseline: chronic stress becomes normal, curiosity declines, and avoidance increases. A DELS-informed tool could notice that trajectory—rising error rates, slower recovery after breaks, more random guessing—and treat it as a developing failure mode rather than a single bad day. It could then prompt adjustments for both student and teacher: rebalance workload, reset expectations, or change how feedback is delivered.

At a classroom or school level, ergonomics of attention means building timetables, homework norms, and assessment practices that don’t routinely push everyone past their regulatory capacity. AI can support this without replacing teachers by surfacing aggregated patterns: when students are most overloaded, which task types produce the most stable focus, and where attention reliably collapses. DELS offers a shared vocabulary for interpreting those patterns: load, capacity, drift, recovery, and which students are being stretched beyond sustainability to keep the system moving.

Ergonomics of attention isn’t a soft add-on. It’s a core design problem in education. DELS doesn’t solve the problem by itself, but it turns vague impressions (“they look exhausted,” “this is too much”) into something you can monitor and adapt to—so teachers and AI tools work with attention rather than against it.`
},
{
  id: "sirius-regulated-cfrplus-poker-agent",
  variant: "text",
  title: "Sirius: A Regulated CFR+ Poker Agent",
  summary:
    "Designing a poker agent that pairs Counterfactual Regret Minimization (CFR+) as the tactical strategy engine with DELS as a regulatory meta-controller.",
  tags: ["Poker-AI", "CFR+", "DELS", "Game-Theory", "Multi-Agent-Systems"],
  height: 1180,
  detailRead: `Designing a strong poker AI is no longer just a question of “Which algorithm wins more chips?” Once you move from lab games to messy, long-horizon play—multiple tables, changing opponents, bankroll constraints—you start needing something more like regulation than pure optimisation. That’s where combining CFR+ (Counterfactual Regret Minimization Plus) with a Dynamic-Equilibrium Learning System (DELS) gets interesting.

CFR+ as the tactical engine:

CFR+ is excellent at what it does: approximating game-theoretic strategies in imperfect-information games by repeatedly simulating play, tracking regret for each decision, and shifting the policy toward actions that perform better on average.

In a Sirius-style agent, CFR+ is the tactical core:
	•	It holds the strategy profile for each information set.
	•	It updates regrets from simulated or real hands.
	•	It generates action probabilities (fold/call/raise sizes) given the current game state.

If all you cared about was single-table, fixed-blind, no-bankroll, no-psychology poker, CFR+ alone might be enough. But in real environments, “optimal” local play can still be globally dumb: grinding high-variance lines when your bankroll is fragile, ignoring table selection, failing to adapt to opponent pools, or continuing to play when variance and emotional conditions mimic human tilt.


DELS as the regulatory layer:

DELS treats Sirius as a feedback-regulated system with key state variables and a finite capacity to stay in a viable regime. The basic move is:
	1.	Define key state variables (KSVs) for the agent:
	   •	Bankroll health (relative to risk-of-ruin thresholds).
	   •	Strategic calibration (how far current play drifts from CFR+’s learned equilibrium strategy).
	   •	Environmental volatility (opponent pool strength, aggression, variance).
	   •	Complexity load (number of tables, decision frequency, computational budget).
	2.	Define admissible ranges for each KSV—what counts as “functional”:
	   •	Bankroll above a safety floor.
	   •	Drift from equilibrium below some tolerance.
	   •	Volatility manageable given bankroll and risk profile.
	   •	Load below capacity so updates remain stable.
	3.	Monitor feedback and regulate:
DELS becomes a meta-controller that wraps CFR+:
	•	When bankroll approaches critical bounds, it can:
	   ->	Switch to a lower-variance sub-strategy,
	   ->	Drop stakes or tables,
	   -> Enforce stop-loss or mandatory cooldowns.
	•	When drift from equilibrium grows (e.g. due to overfitting to a small opponent sample):
	   ->	It can blend back toward the baseline CFR+ strategy,
	   ->	Or schedule fresh training against diverse opponents.
	•	When environmental volatility spikes:
	   ->	It can tighten risk thresholds,
	   ->	Adjust table selection,
	   ->	Or reduce exploitative deviations in favour of robustness.
	•	When load is too high:
	   ->	It can reduce simultaneous tables,
	   ->	Slow update frequency,
	   -> Or simplify decision branches (fewer bet sizes, more abstraction).

The key idea: CFR+ decides how to play; DELS decides whether, where, and under which constraints it should be playing at all.

Sirius as a full system:

Put together, Sirius looks like:
	•	Core layer – CFR+ strategist
	•	Learns and updates strategies from self-play and historical data.
	•	Outputs action probabilities for each decision point.
	•	Regulation layer – DELS meta-agent
	•	Continuously tracks Sirius’s KSVs over time.
	•	Treats long-run play as a dynamic equilibrium problem: keep the agent within a healthy operating regime.
	•	Applies protective interventions (stop, slow, simplify, re-calibrate) when variables approach critical bounds.
	•	Environment / MAS layer
	•	Multiple Sirius instances, or Sirius vs other agents, running in a simulated ecosystem of tables, stakes, and opponent types.
	•	Lets you test not just “Does this strategy win?” but “Under what regulatory rules does the system remain viable over long horizons?”

Sirius is an experiment in governing a strong optimiser so that it behaves like a sustainable system rather than a greedy exploit engine.

Implementations would be published soon!`
},
{
  id: "dels-cognitive-architecture",
  variant: "detail",
  title: "DELS and Cognitive Architecture",
  summary:
    "An overview of DELS as a regulation layer on cognitive architecture: minds as dynamic-equilibrium systems that keep key variables (load, regulation, drift, failure, and recovery) within functional bounds.",
  tags: [


    "Cybernetics",
    "Cognitive Control",
    "Metacognition",
    "Feedback loops",
  ],
  height: 820,
  detailRead: `DELS and Cognitive Architecture is a way of looking at a mind the way you’d look at any system that has to keep operating over time.

Not as a static thing. Not as a collection of traits. But as something that has internal state, takes in signals, makes moves, gets feedback, and has to regulate itself so it doesn’t burn out, freeze, or drift off course.

A cognitive architecture is the wiring diagram: how perception, memory, attention, emotion, and decision-making are organised, and how they communicate.

DELS adds the question that matters over time: for this mind, human or artificial, what variables have to stay within range for it to keep working, and what control loops are actually trying to keep them there?

Because minds don’t run on one dial. They run on several.

Cognitive load: how crowded working memory is.
Arousal and alertness: whether the system is awake, engaged, threatened, or dulled.
Confidence and uncertainty: whether it’s moving too boldly or hesitating too long.
Emotional tone: threat, curiosity, shame, play.
Trust in its own model: that quiet internal question, “Do I actually understand what’s happening?”

Each variable has functional bounds. Too little arousal and nothing matters. Too much and everything becomes an emergency. Too little uncertainty and you get brittle overconfidence. Too much and the system locks up.

A mind is in dynamic equilibrium when these variables shift constantly, but stay within useful ranges while the system keeps doing its job: taking in noisy, conflicting input, producing actions and plans, and using feedback to update what it does next.

In that framing, a cognitive architecture isn’t just modules stacked together. It’s a regulation system. It’s the set of mechanisms that keep the dials from sliding into failure states.

That’s also where the fast and slow split fits in.

Modern cognitive science talks about two broad speeds: fast, automatic processing—pattern recognition, habits, heuristics—and slow, deliberate processing—reasoning, planning, self-control.

DELS doesn’t argue with that. It asks what keeps the whole two-speed machine viable.

When fast responses work, the system saves energy. Load stays low. Things feel smooth.

When the environment shifts or tasks get more complex, the slow system has to step in. That costs more. It’s heavier. It’s more demanding.

And when the slow system is overused—constant switching, multitasking, decision overload—the mind’s regulatory capacity starts to strain. Attention fragments. Self-monitoring drops. Errors creep in. The system can still function, but it’s running hot.

In DELS terms, you can describe a mind as having sensors and regulators.

Sensors monitor the internal state: fatigue, conflict signals, error detection, overload, rising stress, slipping focus.

Regulators shift strategy: take a break, narrow the task, change priorities, lower stakes, ask for help, automate what can be automated.

And there are policies—rules for escalation and rules for automation. When do you “think harder,” and when do you stop thinking and rely on habit? When do you push through, and when do you step back?

That same language applies to people and to AI systems. Humans say, “I’m too tired to think, I’ll just follow routine.” Models say, “Uncertainty is high, switch to safer mode.” Different surface behaviour, same control logic.

But regulation isn’t only about attention and effort. It’s also about the story the system tells itself.

Cognitive systems build self-models:
“I’m good at this.”
“I always mess this up.”
“People reject me.”
“This situation is safe.”
“This is dangerous.”
“This is pointless.”

Those aren’t just opinions. They’re part of the internal model guiding regulation—what the system approaches, what it avoids, what it invests effort into, what it treats as threat.

If that model gets distorted, regulation gets distorted.

Someone who learned “I always fail” may downshift effort early, even when they’d succeed now. An AI system trained on skewed feedback may learn “this style gets rewarded,” even when the content is wrong or harmful.

That’s drift.

Not a total breakdown. Not obvious failure. Just a slow movement of attention, trust, avoidance, and reward signals away from healthy or intended ranges.

And DELS points out the uncomfortable part: a mind can be in local equilibrium—feeling internally consistent—while being misaligned with reality or long-term goals.

Fixing that isn’t simply “add more information.” It’s adjusting the loops. What counts as error. What gets rewarded. What gets questioned. What gets treated as noise, and what gets treated as signal.

Because over time, the mind doesn’t just think.

It steers.`
},

];

/** @type {SneakpeekItem[]} */
export const CREATIVE_SNEAKPEEK = [
  {
    id: "c_simsea_arcade",
    variant: "image",
    title: "Simulation Sea",
    summary:
      "Small simulations and assessments—designed as calm interfaces with strange edges.",
    tags: ["games", "simulation", "web"],
    img: logos,
    height: 760,
    href: "", // optional: only if you want click navigation later
    glare: "ice",
  },
  {
    id: "c_journey_chords",
    variant: "image",
    title: "Journey Chords",
    summary:
      "A tour planner for bands—routing, costs, constraints, and sanity checks without the noise.",
    tags: ["product", "planning", "tools"],
    img: log,
    href: "",
    height: 700,
    glare: "soft",
  },

  {
    id: "c_cognitive_forest",
    variant: "image",
    title: "Cognitive Forest",
    summary:
      "Short writings and small tools about attention, bias, meaning, and modern life.",
    tags: ["Cognition", "Projection", "Paradox"],
    img: logo2,
    href: "",
    height: 680,
    glare: "soft",
  },
    {
    id: "c_sirius_pokerbot",
    variant: "image",
    title: "Sirius PokerBot",
    summary:
      "Decision logic + table dynamics—an experiment in strategy, uncertainty, and readable reasoning.",
    tags: ["ai", "game", "strategy"],
    img: poker,
    href: "",
    height: 720,
    glare: "ice",
  },
  {
    id: "c_satirical_theatre",
    variant: "image",
    title: "Satirical Theatre",
    summary:
      "Short scenes that expose incentives, status, and institutional nonsense.",
    tags: ["Bias", "Hypocrisy", "Denial"],
    img: satire,
    href: "",
    height: 740,
    glare: "ice",
  },

  // CONTACT CARD (in-grid, image card, internal route)
];

export const SNEAKPEEK = {
  research: RESEARCH_SNEAKPEEK,
  creative: CREATIVE_SNEAKPEEK,
};

export default SNEAKPEEK;