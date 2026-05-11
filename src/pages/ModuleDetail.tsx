import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { PM_MODULES } from '../constants/courseData';
import { ArrowLeft, Play, FileText, Check, BrainCircuit, BookOpen, Clock, GraduationCap, Brain, Award, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { QuizComponent } from '../components/QuizComponent';

const MODULE_CONTENT: Record<number, any[]> = {
  1: [
    {
      "id": "1.0",
      "title": "Strategy: The Stakeholder Domain",
      "type": "video",
      "youtubeId": "LxosjJcysqI",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "In PMBOK 7, which 'Domain' focuses specifically on the human element and their impact on the project?",
          "options": ["Planning Domain", "Stakeholder Performance Domain", "Team Performance Domain", "Delivery Domain"],
          "correctAnswer": 1,
          "explanation": "The Stakeholder Performance Domain addresses activities and functions associated with stakeholders."
        },
        {
          "question": "Which tool is used to categorize stakeholders based on their power and influence?",
          "options": ["WBS", "Gantt Chart", "Power/Interest Grid", "Burnup Chart"],
          "correctAnswer": 2
        }
      ],
      "reading": `### Subject 1: Stakeholder Strategy & Engagement

**📘 AI Structured Reading**
- **Definition:** Engagement is the active involvement of stakeholders to foster support and manage expectations.
- **Key Concepts:** Power/Interest Grid, Engagement Matrix, Communication Plan.
- **PMBOK 7 Focus:** Building a collaborative environment rather than just "managing" people.

**🌍 Real-World Case**
- **Scenario:** Local community pushback on a new construction project.
- **Action:** Implementing a Stakeholder Forum early in initiation to capture concerns.
- **Outcome:** Reduced legal delays by 30% due to early alignment.

**🏅 Badge: Engagement Architect**`
    },
    { 
      id: '1.high_impact',
      title: 'Exam Strategy: 180 Scenarios',
      type: 'video',
      youtubeId: 'TZMum9cuoJY',
      duration: '3h 20m',
      completed: false,
      questions: [
        {
          question: "When faced with a complex scenario, what is the first step according to PMI mindset?",
          options: ["Update the project plan", "Analyze the situation", "Escalate to the sponsor", "Inform the stakeholders"],
          correctAnswer: 1,
          explanation: "Always analyze before acting or escalating."
        }
      ],
      reading: `### Subject: The PM Mindset (PMBOK 7)

**📘 AI Structured Reading**
- **Focus:** Situational analysis and principle-based decision making.
- **Concepts:** Stewardship, Team, Stakeholders, Value, Systems Thinking.

**📝 Quick Preparation**
- Watch the 180 scenarios video to understand the "patterns" of PMP questions.
- Success is often about choosing the 'Professional' and 'Servant Leader' response.`
    },
    { 
      id: '1.1', 
      title: 'Subject: Business Case (Value Principle)', 
      type: 'video', 
      youtubeId: 'vB_MND5Dxy8',
      duration: '45 min', 
      completed: true, 
      questions: [
        {
          question: "Which financial metric is used to determine if the present value of future cash flows exceeds the initial investment?",
          options: ["ROI", "NPV (Net Present Value)", "BCR (Benefit Cost Ratio)", "IRR"],
          correctAnswer: 1,
          explanation: "NPV accounts for the time value of money and is a primary indicator of whether a project will create value."
        },
        {
          question: "In the context of the Business Case, what is the primary role of 'Strategic Alignment'?",
          options: ["Ensuring the project stays under budget", "Confirming the project supports organizational goals", "Listing all technical requirements", "Assigning the project manager"],
          correctAnswer: 1
        },
        {
          question: "Who is primarily responsible for the creation and maintenance of the Business Case?",
          options: ["Project Manager", "Project Sponsor", "Stakeholders", "Development Team"],
          correctAnswer: 1,
          explanation: "The Sponsor owns the business case and justifies the investment."
        }
      ],
      reading: `### Subject 1: Business Case Architecture

**🎥 Video Preparation**
- Search YouTube: "Project Management Business Case Explained", "How to Write a Business Case PMI"
- Recommended Channels: Project Management Institute (PMI), Praizion / Aileen Ellis

**📘 AI Structured Reading**
- **Definition:** A Business Case justifies why a project should exist through strategic impact analysis.
- **Core Components:** Problem Statement, Opportunity, Financial Analysis (ROI, NPV), Strategic Alignment, Risks & Assumptions.
- **Formula Thinking:** \`Value > Cost + Risk → APPROVE PROJECT\`

**📖 Glossary**
- **Strategic Alignment:** The process of ensuring a project supports the organization's long-term goals.
- **NPV (Net Present Value):** The difference between the present value of cash inflows and outflows over a period of time.

**🌍 Real-World Case / Practical Scenario**
- **Scenario:** A bank wants to build a mobile banking app.
- **Problem:** Customers leaving due to poor digital experience.
- **Solution:** Integrated mobile banking platform.
- **ROI:** 35% increase in retention.
- **Decision:** Approved due to high strategic value and retention outcomes.

**🧠 Practice Q&A**
- **Q1:** What is the purpose of a business case?
- **A:** To justify the project's value and strategic alignment.
- **Q2:** What financial metric is commonly used?
- **A:** ROI (Return on Investment).

**📝 Subject Quiz (10 Questions)**
1. What defines project value in PMBOK 7?
2. What is ROI?
3. Who primarily approves a business case?
4. What is a risk assumption?
5. Strategic alignment refers to?
6. What is NPV?
7. What happens if cost > projected value?
8. Who creates the initial business case?
9. What is opportunity cost?
10. What is the main goal of the business case?

**🏅 Badge: Value Architect**`
    },
    { 
      id: '1.2', 
      title: 'Subject: Project Assessment (System Thinking)', 
      type: 'video', 
      youtubeId: 'XWvIK6L9_u4',
      duration: '35 min', 
      completed: true, 
      questions: [
        {
          question: "What does the 'Operational Feasibility' of a project measure?",
          options: ["How well it solves the business problem", "If the technology exists to build it", "The return on investment", "Legal compliance"],
          correctAnswer: 0
        },
        {
          question: "Systems Thinking requires evaluating a project through the lens of:",
          options: ["Isolated tasks", "Individual performance", "Interdependencies and organizational impact", "Fastest delivery speed"],
          correctAnswer: 2
        }
      ],
      reading: `### Subject 2: Project Feasibility & Assessment

**🎥 Video Preparation**
- Search YouTube: "Project Feasibility Study Explained", "Technical vs Financial Feasibility"
- Recommended Channel: Mike Clayton (Online PM Courses)

**📘 AI Structured Reading**
- **Definition:** Evaluation of system impact, interdependencies, and total organizational readiness.
- **Feasibility Types:** Technical, Financial, Operational, Legal (TFOL Framework).
- **PMBOK 7 Insight:** Evaluate how the project affects the overall organizational system.

**🌍 Real-World Case**
- **Scenario:** Startup evaluates building a custom AI chatbot.
- **Assessment:** High technical complexity, $500k dev cost, 18-month timeline.
- **Decision:** Rejected due to excessive cost vs moderate strategic fit.

**🧠 Practice Q&A**
- **Q:** What is feasibility?
- **A:** The ability to execute a project successfully within given constraints.

**📝 Subject Quiz (10 Questions)**
1. Name the four primary feasibility types.
2. What does 'Operational Feasibility' measure?
3. Why check legal constraints early?
4. What is technical debt?
5. How does 'System Thinking' impact assessment?
6. When should a project be rejected?
7. What is a feasibility study?
8. Who performs the technical assessment?
9. Define 'Financial Feasibility'.
10. What is 'Operational Readiness'?

**🏅 Badge: Assessment Strategist**`
    },
    { 
      id: '1.3', 
      title: 'Subject: Project Deliverable (Outcome Focus)', 
      type: 'interaction', 
      duration: '25 min', 
      completed: false, 
      questions: [
        {
          question: "What is the key difference between an Output and an Outcome?",
          options: ["Outputs are better than Outcomes", "Outputs are tangible products; Outcomes are result-based benefits", "Outcomes are documents; Outputs are code", "There is no difference"],
          correctAnswer: 1
        }
      ],
      reading: `### Subject 3: Deliverables = Outcome Enablers

**📘 AI Structured Reading**
- **Definition:** Deliverables are measurable outputs that empower business outcomes.
- **Framework (PMBOK 7):** Focus on the *Outcome* (the result) rather than just the *Output* (the thing).
- **Deliverable Examples:** Software source code (Output) vs Improved Customer Experience (Outcome).

**🌍 Real-World Case**
- **Scenario:** Website redesign for an e-commerce giant.
- **Outputs:** New UI design, Backend API, Deployment scripts.
- **Outcomes:** 20% faster checkout, reduced bounce rate.
- **Decision:** Successful if outcomes match strategic value.

**📝 Subject Quiz (10 Questions)**
1. What is a deliverable?
2. Difference between Output and Outcome?
3. What is an 'Outcome Enabler'?
4. Give an example of a software deliverable.
5. Why focus on value delivery?
6. What is a 'Tangible' deliverable?
7. Define 'Intangible' deliverables.
8. Who defines the required deliverables?
9. When is a deliverable considered complete?
10. How do deliverables relate to the WBS?

**🏅 Badge: Deliverable Designer**`
    },
    { 
      id: '1.4', 
      title: 'Subject: Initial Project Risk (Uncertainty Domain)', 
      type: 'interaction', 
      duration: '20 min', 
      completed: false, 
      reading: `### Subject 4: Navigating Initial Uncertainty

**📘 AI Structured Reading**
- **New Language (PMBOK 7):** Risk is defined as the "Uncertainty Domain".
- **Types of Uncertainty:** Technical, Financial, Schedule, Resource.
- **Opportunities vs Threats:** Managing both positive and negative uncertainties.

**🌍 Real-World Case**
- **Scenario:** Moving enterprise infrastructure to the cloud.
- **Threat:** Security breach during migration.
- **Opportunity:** Modernizing architecture to reduce long-term costs.
- **Decision:** Proceed with strict encryption protocols to mitigate key threats.

**📝 Subject Quiz (10 Questions)**
1. How does PMBOK 7 define Risk?
2. What is a 'Positive Risk'?
3. Define the 'Uncertainty Domain'.
4. Name a common financial risk.
5. What is a risk trigger?
6. Why identify risks in initiation?
7. What is 'Risk Appetite'?
8. Define 'Residual Risk'.
9. What is a 'Threat'?
10. How to document high-level risks?

**🏅 Badge: Risk Identifier**`
    },
    { 
      id: '1.5', 
      title: 'Subject: Approval Workflow (Stewardship)', 
      type: 'interaction', 
      duration: '15 min', 
      completed: false, 
      reading: `### Subject 5: Adaptive Governance & Stewardship

**📘 AI Structured Reading**
- **Core Principle:** Stewardship is the responsible management of project resources.
- **Approval Steps:** Submission → Ethical Review → Stakeholder Approval → Funding Release.
- **Governance:** Ensuring value-based, transparent decision-making.

**🌍 Real-World Case**
- **Scenario:** Large-scale infrastructure project.
- **Status:** Review reveals possible budget overrun in Phase 2.
- **Stewardship Decision:** Project paused/rejected for funding until cost-efficiency is proven.

**📝 Subject Quiz (10 Questions)**
1. What is Stewardship?
2. Define the 'Approval Workflow'.
3. Why is ethical review important?
4. Who releases project funding?
5. What is 'Value-Based Approval'?
6. Purpose of Project Governance?
7. Role of the Project Sponsor in approval?
8. What is 'Stage-Gate' approval?
9. Importance of transparency?
10. Define 'Accountability' in PM.

**🏅 Badge: Workflow Navigator**`
    },
    { 
      id: '1.6', 
      title: 'Task: Mini Project Charter Build', 
      type: 'interaction', 
      duration: '40 min', 
      completed: false, 
      reading: `### Practice Lab: Mini Charter Capstone

**Final Task Instructions**
Construct a foundational blueprint for your Mobile Health App project using everything learned in Module 1.

**Must Include:**
1. **Objective:** Define the outcome-focused goal.
2. **Scope:** List the primary enablers/deliverables.
3. **Budget:** Set high-level funding benchmarks.
4. **Timeline:** Identify critical milestones.
5. **Risks:** Map initial high-impact uncertainties.
6. **Stakeholders:** Identify the Power vs Interest grid.

**Submission Metric:**
- Complete all 6 sections to unlock the "Module 1 Mastery" accreditation.

**University of Portsmouth +5**`
    },
    {
      "id": "1.7",
      "title": "Module 1: Comprehensive Assessment",
      "type": "interaction",
      "duration": "1h 30m",
      "completed": false,
      "questions": [
        {"question": "What is the primary purpose of the project initiation phase?", "options": ["Define deliverables in detail", "Authorize the project and identify stakeholders", "Assign resources to tasks", "Close project contracts"], "correctAnswer": 1},
        {"question": "Which document formally authorizes a project to begin?", "options": ["Project Management Plan", "Business Case", "Project Charter", "Statement of Work"], "correctAnswer": 2},
        {"question": "Who typically signs the Project Charter?", "options": ["Project Manager", "Project Sponsor", "Customer", "Quality Manager"], "correctAnswer": 1},
        {"question": "Stakeholders are best described as:", "options": ["Only the project team members", "Individuals or groups who may affect or be affected by the project", "Shareholders of the company", "External vendors only"], "correctAnswer": 1},
        {"question": "A Business Case is primarily used to:", "options": ["Allocate the project budget", "Justify the project investment and demonstrate value", "Define the project schedule", "Identify project risks"], "correctAnswer": 1},
        {"question": "Which of the following is NOT typically included in a Project Charter?", "options": ["High-level objectives", "Detailed work breakdown structure", "Project sponsor name", "High-level budget estimate"], "correctAnswer": 1},
        {"question": "A stakeholder register is used to:", "options": ["Record the project schedule", "Document stakeholder information and interest levels", "List project deliverables", "Record financial transactions"], "correctAnswer": 1},
        {"question": "The concept of 'value' in project management refers to:", "options": ["Monetary profit only", "The worth or benefit delivered relative to cost and effort", "The number of deliverables produced", "The speed of project completion"], "correctAnswer": 1},
        {"question": "Stakeholder analysis involves:", "options": ["Scheduling stakeholder meetings", "Identifying stakeholders and assessing their power, interest, and influence", "Terminating contracts with uncooperative stakeholders", "Assigning tasks to stakeholders"], "correctAnswer": 1},
        {"question": "A project's feasibility is typically assessed during:", "options": ["Project closure", "Project execution", "Project initiation", "Project monitoring"], "correctAnswer": 2},
        {"question": "Which stakeholder engagement strategy is best for high-power, low-interest stakeholders?", "options": ["Manage closely", "Monitor", "Keep satisfied", "Keep informed"], "correctAnswer": 2},
        {"question": "The term 'benefits realization' refers to:", "options": ["Completing the project on time", "Ensuring intended outcomes and value are achieved post-project", "Calculating project profits", "Distributing bonuses to the team"], "correctAnswer": 1},
        {"question": "Which of the following best defines project scope during initiation?", "options": ["A detailed task list", "A high-level description of what the project will and will not include", "The project budget breakdown", "The risk register"], "correctAnswer": 1},
        {"question": "A key output of the Identify Stakeholders process is:", "options": ["Project schedule", "Stakeholder register", "Risk log", "Communications plan"], "correctAnswer": 1},
        {"question": "Why is stakeholder engagement critical during initiation?", "options": ["To reduce project cost", "To gain early buy-in and avoid conflicts later", "To complete the project charter faster", "To finalize the project schedule"], "correctAnswer": 1},
        {"question": "Which best describes a 'project' as opposed to 'operations'?", "options": ["A project is ongoing and repetitive", "A project is temporary with a defined start and end", "Operations have a defined end date", "Operations require a project charter"], "correctAnswer": 1},
        {"question": "The 'power/interest grid' is used to:", "options": ["Determine team salaries", "Prioritize stakeholder engagement strategies", "Allocate project resources", "Estimate task durations"], "correctAnswer": 1},
        {"question": "Which element is essential for defining project value?", "options": ["Project team size", "Alignment with organizational strategy and goals", "Number of stakeholders involved", "Project duration"], "correctAnswer": 1},
        {"question": "The purpose of a stakeholder engagement assessment matrix is to:", "options": ["Document project risks", "Compare current vs. desired stakeholder engagement levels", "Assign tasks to stakeholders", "Record project changes"], "correctAnswer": 1},
        {"question": "Pre-project activities typically include:", "options": ["Executing deliverables", "Needs analysis, feasibility study, and business case development", "Closing contracts", "Updating the risk register"], "correctAnswer": 1},
        {"question": "Which document provides the project manager with the authority to use resources?", "options": ["Project Plan", "Project Charter", "Business Case", "Scope Statement"], "correctAnswer": 1},
        {"question": "A project sponsor's primary role is to:", "options": ["Manage daily project activities", "Provide strategic direction and secure resources", "Write the project schedule", "Conduct quality reviews"], "correctAnswer": 1},
        {"question": "Which of the following describes 'scope creep' risk during initiation?", "options": ["Completing the project ahead of schedule", "Undefined or poorly managed changes expanding the project beyond original goals", "Running out of budget", "Losing team members"], "correctAnswer": 1},
        {"question": "A RACI matrix helps to:", "options": ["Identify project risks", "Clarify stakeholder roles and responsibilities", "Track project budget", "Schedule project activities"], "correctAnswer": 1},
        {"question": "What is the key difference between a stakeholder and a project team member?", "options": ["Stakeholders are always external to the organization", "Stakeholders include anyone who can affect or be affected; team members execute work", "Team members have no interest in outcomes", "There is no difference"], "correctAnswer": 1},
        {"question": "Which is a primary input to the Develop Project Charter process?", "options": ["Project schedule", "Business case and agreements", "Risk register", "Lessons learned register"], "correctAnswer": 1},
        {"question": "A project's strategic alignment ensures:", "options": ["The project finishes on time", "The project contributes to organizational goals and delivers value", "All stakeholders are satisfied", "The project uses minimum resources"], "correctAnswer": 1},
        {"question": "Which stakeholder engagement level means a stakeholder actively supports the project?", "options": ["Unaware", "Resistant", "Supportive", "Neutral"], "correctAnswer": 2},
        {"question": "The concept of 'organizational process assets' includes:", "options": ["Physical equipment", "Templates, lessons learned, and historical data", "Budget reserves", "Vendor contracts"], "correctAnswer": 1},
        {"question": "What is a 'constraint' in a project context?", "options": ["A project opportunity", "A limiting factor that affects project execution", "A project milestone", "A stakeholder requirement"], "correctAnswer": 1},
        {"question": "During initiation, the project manager should:", "options": ["Develop detailed task schedules", "Identify key stakeholders and clarify project goals at a high level", "Begin procurement activities", "Close out previous project phases"], "correctAnswer": 1},
        {"question": "Which of the following best describes 'enterprise environmental factors'?", "options": ["Weather conditions affecting the project", "External and internal conditions that influence the project", "Environmental sustainability requirements", "Office environment standards"], "correctAnswer": 1},
        {"question": "A project's 'assumption' refers to:", "options": ["A confirmed fact", "A factor considered true for planning purposes without proof", "A project risk", "A contractual obligation"], "correctAnswer": 1},
        {"question": "The primary goal of stakeholder identification is to:", "options": ["Reduce the number of stakeholders", "Ensure all individuals who could impact or be impacted are recognized early", "Assign roles to the project team", "Create the project schedule"], "correctAnswer": 1},
        {"question": "Which is a benefit of producing a project charter during initiation?", "options": ["Eliminate all project risks", "Provides project authorization and alignment between sponsor and team", "Guarantees project success", "Reduces the need for stakeholder engagement"], "correctAnswer": 1},
        {"question": "What does ROI stand for in project management?", "options": ["Risk of Investment", "Return on Investment", "Return on Implementation", "Review of Impact"], "correctAnswer": 1},
        {"question": "Identifying project constraints during initiation helps to:", "options": ["Assign project tasks", "Set realistic expectations and boundaries for the project", "Develop the risk register", "Finalize procurement plans"], "correctAnswer": 1},
        {"question": "Which of the following is a key characteristic of a successful project manager during initiation?", "options": ["Focus exclusively on technical skills", "Strong stakeholder communication and leadership", "Detailed coding expertise", "Financial auditing skills"], "correctAnswer": 1},
        {"question": "In stakeholder engagement, 'resistance' means:", "options": ["The stakeholder actively supports the project", "The stakeholder is aware but opposes project changes", "The stakeholder is unaware of the project", "The stakeholder is neutral"], "correctAnswer": 1},
        {"question": "The kick-off meeting during initiation is used to:", "options": ["Close the project", "Officially launch the project and align all stakeholders", "Finalize the project budget", "Identify project risks only"], "correctAnswer": 1},
        {"question": "A project's 'business value' can be:", "options": ["Tangible only (financial)", "Both tangible (cost savings) and intangible (brand reputation)", "Measured only after project closure", "Defined only by the project manager"], "correctAnswer": 1},
        {"question": "Which process group does 'Develop Project Charter' belong to?", "options": ["Planning", "Initiating", "Executing", "Monitoring & Controlling"], "correctAnswer": 1},
        {"question": "What is the role of a 'champion' stakeholder?", "options": ["To block project approval", "To advocate for and promote the project within the organization", "To manage project risks", "To audit project finances"], "correctAnswer": 1},
        {"question": "A needs assessment helps to:", "options": ["Define the project schedule", "Identify gaps between current and desired states to justify the project", "Allocate project resources", "Close out the project phase"], "correctAnswer": 1},
        {"question": "Which best describes the project life cycle?", "options": ["A series of unrelated activities", "The phases a project passes through from initiation to closure", "The operational lifecycle of a product", "The timeline of stakeholder meetings"], "correctAnswer": 1},
        {"question": "A 'high-level' requirement in project initiation is:", "options": ["A detailed technical specification", "A broad statement of need or expectation without specific details", "A contractual obligation", "A financial forecast"], "correctAnswer": 1},
        {"question": "The salience model for stakeholders considers:", "options": ["Budget, timeline, and scope", "Power, legitimacy, and urgency", "Interest, cost, and risk", "Quality, communication, and risk"], "correctAnswer": 1},
        {"question": "Which statement about project value is most accurate?", "options": ["Value is determined only at project completion", "Value should be continuously assessed throughout the project lifecycle", "Value is only financial", "Value is defined solely by the project manager"], "correctAnswer": 1},
        {"question": "What is the primary purpose of a stakeholder engagement plan?", "options": ["To document project costs", "To define strategies for effective stakeholder communication and involvement", "To create the project schedule", "To allocate project risks"], "correctAnswer": 1},
        {"question": "Which of the following is an example of a tangible project benefit?", "options": ["Improved employee morale", "Reduction in annual operating costs by 15%", "Enhanced brand awareness", "Increased customer satisfaction"], "correctAnswer": 1}
      ],
      "reading": `### Module 1 Final Exam

**📘 AI Structured Reading**
- **Purpose:** This 50-question exam validates your mastery of the Initiation phase, including Business Case, Project Charter, Stakeholder Engagement, and Value Delivery.
- **Goal:** Aim for at least 80% (40/50) to demonstrate proficiency in these core PMBOK 7 concepts.

**🌍 Practical Tips**
- Read each scenario carefully.
- Identify the 'Mindset' required (Servant Leader, Analyst, Steward).
- Watch out for 'Distractors' that seem plausible but represent planning or execution rather than initiation.

**🏅 Badge: Initiation Expert**`
    }
  ],
  2: [
    {
      "id": "2.1",
      "title": "Integrated Project Planning",
      "type": "video",
      "youtubeId": "2gmCr40uT4U",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "What is the primary focus of the 'Planning Performance Domain' in PMBOK 7?",
          "options": ["Creating a static schedule", "Initial, ongoing, and evolved coordination of work", "Managing stakeholder power", "Monitoring budget only"],
          "correctAnswer": 1,
          "explanation": "Planning is the domain where we handle initial and ongoing coordination."
        },
        {
          "question": "Which term describes the process of adding more detail to a plan as more information becomes available?",
          "options": ["Scope Creep", "Progressive Elaboration", "Gold Plating", "Fast Tracking"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 1: The Planning Domain Framework

**📘 AI Structured Reading**
- **Objective:** Develop integrated project management plans that align with organizational strategy.
- **Key Concepts:** Integrated Planning, Baseline Management, and Resource Stewardship.
- **PMBOK 7 Focus:** Planning is not a one-time event; it is an iterative lifecycle activity.

**🌍 Real-World Case**
- **Scenario:** Designing a sustainable urban park.
- **Approach:** Using high-level strategic planning for the layout, followed by detailed tactical planning for seasonal planting.
- **Outcome:** Adjusting the plan based on soil tests mid-project (Progressive Elaboration).

**🏅 Badge: Strategic Planner**`
    },
    {
      "id": "2.2",
      "title": "WBS & Estimation Techniques",
      "type": "video",
      "youtubeId": "ZWmXi3TW1yA",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "In a WBS, what is the '100% Rule'?",
          "options": ["A package must take 100 hours", "The WBS must account for 100% of the project scope", "100 stakeholders must approve", "Success is only 100% completion"],
          "correctAnswer": 1
        },
        {
          "question": "Which estimation technique uses historical data from similar projects?",
          "options": ["Bottom-up", "Parametric", "Analogous", "Three-point"],
          "correctAnswer": 2
        }
      ],
      "reading": `### Subject 2: Decomposing Scope into Value

**📘 AI Structured Reading**
- **Definition:** The Work Breakdown Structure (WBS) is a hierarchical decomposition of the total scope of work.
- **Estimation Models:** Analogous (Speed), Parametric (Accuracy), and Bottom-Up (Detail).
- **Baselines:** Scope, Schedule, and Cost form the core Performance Measurement Baseline.

**🌍 Real-World Case**
- **Scenario:** Software Migration Project.
- **The System:** Decomposing the "Database Migration" into sub-tasks: Schema Mapping, Data Transfer, and Validation.
- **Outcome:** Better tracking through clearly defined Work Packages.

**🏅 Badge: Decomposition Expert**`
    },
    {
      "id": "2.3",
      "title": "Baselines & Success Metrics",
      "type": "interaction",
      "duration": "20 min",
      "completed": false,
      "reading": `### Subject 3: Establishing Success Baselines

**📘 AI Structured Reading**
- **Progressive Elaboration:** Iteratively adding detail to the project management plan.
- **Rolling Wave Planning:** Planning near-term work in detail and future work at a high level.
- **Planning Packages:** Placeholder components in the WBS for future work without detailed deliverables yet.

**📝 Quick Preparation**
1. How do you integrate Scope with Schedule?
2. Define a Control Account.
3. Importance of the 100% Rule?

**🏅 Badge: Metric Master**`
    },
    {
      "id": "2.4",
      "title": "Module 2: Comprehensive Assessment",
      "type": "interaction",
      "duration": "1h 45m",
      "completed": false,
      "questions": [
        {"question": "The primary output of the planning process group is:", "options": ["Project Charter", "Project Management Plan", "Final Project Report", "Risk Register"], "correctAnswer": 1},
        {"question": "Scope planning involves:", "options": ["Assigning resources to tasks", "Defining what is and is not included in the project", "Tracking project performance", "Closing vendor contracts"], "correctAnswer": 1},
        {"question": "A Work Breakdown Structure (WBS) is:", "options": ["A project schedule", "A hierarchical decomposition of the total project scope", "A risk assessment tool", "A budget document"], "correctAnswer": 1},
        {"question": "Which estimation technique averages the optimistic, most likely, and pessimistic estimates?", "options": ["Bottom-up estimating", "Three-point estimating (PERT)", "Analogous estimating", "Parametric estimating"], "correctAnswer": 1},
        {"question": "A project baseline refers to:", "options": ["The initial budget request", "The approved version of a plan used as a comparison for actual performance", "The project's start date", "The minimum quality standard"], "correctAnswer": 1},
        {"question": "Which planning document describes how changes will be managed?", "options": ["Risk Management Plan", "Change Management Plan", "Communication Plan", "Quality Management Plan"], "correctAnswer": 1},
        {"question": "Resource planning involves:", "options": ["Scheduling meetings with stakeholders", "Identifying, acquiring, and managing resources needed for the project", "Closing out project phases", "Documenting lessons learned"], "correctAnswer": 1},
        {"question": "A project schedule is primarily used to:", "options": ["Justify the project budget", "Define the timing and sequence of project activities", "Identify stakeholder concerns", "Document project risks"], "correctAnswer": 1},
        {"question": "What is 'progressive elaboration' in project management?", "options": ["Rushing planning to start execution quickly", "Refining and detailing the project plan as more information becomes available", "Adding more resources to the project over time", "Completing activities in random order"], "correctAnswer": 1},
        {"question": "The critical path in project scheduling is:", "options": ["The shortest possible path through the project", "The longest sequence of dependent activities determining the project duration", "The most expensive sequence of activities", "The path with the most resources assigned"], "correctAnswer": 1},
        {"question": "A project management plan is best described as:", "options": ["A single document listing all tasks", "An integrated document describing how the project will be executed, monitored, and controlled", "A financial report", "The project charter"], "correctAnswer": 1},
        {"question": "Which of the following is a component of a risk management plan?", "options": ["Project schedule", "Risk categories, probability-impact matrix, and risk responses", "Vendor contracts", "Stakeholder register"], "correctAnswer": 1},
        {"question": "Decomposition in the context of WBS means:", "options": ["Canceling project phases", "Breaking down deliverables into smaller, manageable components", "Assigning tasks to team members", "Reducing the project budget"], "correctAnswer": 1},
        {"question": "What does a project scope statement define?", "options": ["Financial resources available", "The project deliverables, objectives, boundaries, and acceptance criteria", "The communication strategy", "The team organizational chart"], "correctAnswer": 1},
        {"question": "Which planning component estimates how long activities will take?", "options": ["Budget plan", "Activity duration estimating", "Risk plan", "Procurement plan"], "correctAnswer": 1},
        {"question": "A milestone in a project plan represents:", "options": ["A detailed task with assigned resources", "A significant point or event in the project with zero duration", "A budget checkpoint", "A resource allocation decision"], "correctAnswer": 1},
        {"question": "The communications management plan defines:", "options": ["Project deliverables", "Who needs what information, when, and in what format", "Project budget allocations", "Risk response strategies"], "correctAnswer": 1},
        {"question": "Which process involves sequencing project activities?", "options": ["Estimate Activity Resources", "Sequence Activities", "Define Activities", "Develop Schedule"], "correctAnswer": 1},
        {"question": "A cost management plan describes:", "options": ["The project scope boundaries", "How costs will be planned, structured, and controlled", "The schedule baseline", "Stakeholder communication preferences"], "correctAnswer": 1},
        {"question": "Which tool is used to show the timeline of project activities visually?", "options": ["WBS", "Gantt Chart", "Risk Matrix", "RACI Chart"], "correctAnswer": 1},
        {"question": "The planning fallacy refers to:", "options": ["Creating too many planning documents", "The tendency to underestimate time, costs, and risks while overestimating benefits", "Excessive risk planning", "Overloading the team with tasks"], "correctAnswer": 1},
        {"question": "What is the purpose of a procurement management plan?", "options": ["To schedule project meetings", "To define what will be purchased and from whom and how", "To identify project risks", "To allocate team roles"], "correctAnswer": 1},
        {"question": "Which estimating technique uses historical data from similar projects?", "options": ["Bottom-up estimating", "Analogous estimating", "Three-point estimating", "Expert judgment"], "correctAnswer": 1},
        {"question": "A project scope baseline includes:", "options": ["Risk log and stakeholder register", "Project scope statement, WBS, and WBS dictionary", "Budget and schedule only", "The project charter"], "correctAnswer": 1},
        {"question": "Rolling wave planning refers to:", "options": ["Planning all tasks in full detail upfront", "Planning near-term work in detail while leaving future work at a higher level", "Repeating the planning cycle every week", "Planning only during project initiation"], "correctAnswer": 1},
        {"question": "Which of the following is NOT typically part of the project management plan?", "options": ["Scope management plan", "Team performance appraisals", "Schedule management plan", "Risk management plan"], "correctAnswer": 1},
        {"question": "Float (slack) in a project schedule means:", "options": ["The amount of money available above the budget", "The amount of time an activity can be delayed without delaying the project end date", "The number of extra resources available", "The buffer added to quality standards"], "correctAnswer": 1},
        {"question": "Which tool helps identify the sequence and dependencies of project activities?", "options": ["Risk matrix", "Network diagram (PDM/PERT)", "Budget chart", "RACI matrix"], "correctAnswer": 1},
        {"question": "The quality management plan describes:", "options": ["Resource acquisition processes", "Quality standards, objectives, and control processes for the project", "Risk identification methods", "Stakeholder communication protocols"], "correctAnswer": 1},
        {"question": "What is the primary benefit of the planning process?", "options": ["Guaranteeing project success", "Reducing uncertainty by defining a clear roadmap for execution", "Eliminating all project risks", "Satisfying all stakeholders"], "correctAnswer": 1},
        {"question": "An activity list is an output of:", "options": ["Sequence Activities", "Define Activities", "Estimate Activity Durations", "Develop Schedule"], "correctAnswer": 1},
        {"question": "Which is a key principle of effective project planning?", "options": ["Plan in excessive detail for all future activities", "Involve key stakeholders in the planning process", "Avoid documenting assumptions", "Plan independently without team input"], "correctAnswer": 1},
        {"question": "The project schedule baseline is approved during:", "options": ["Project closure", "The planning process group, before execution begins", "Project initiation", "Monitoring and controlling"], "correctAnswer": 1},
        {"question": "A resource calendar shows:", "options": ["Project milestones", "When specific resources are available for the project", "Budget spending over time", "Risk probability ratings"], "correctAnswer": 1},
        {"question": "Which of the following describes 'fast-tracking'?", "options": ["Adding more resources to shorten the schedule", "Performing activities in parallel that were originally planned in sequence", "Removing low-priority tasks", "Increasing the project budget"], "correctAnswer": 1},
        {"question": "A PERT estimate uses the formula:", "options": ["(O + M + P) / 3", "(O + 4M + P) / 6", "(O + P) / 2", "(O + 2M + P) / 4"], "correctAnswer": 1},
        {"question": "Which of the following is a key input to planning processes?", "options": ["Lessons learned from previous projects", "Both A and C", "Organizational process assets", "None of the above"], "correctAnswer": 1},
        {"question": "What does a stakeholder management plan describe?", "options": ["Project financial forecasts", "Strategies and actions to engage stakeholders throughout the project", "Risk assessment criteria", "Resource allocation methods"], "correctAnswer": 1},
        {"question": "Constraint analysis during planning identifies:", "options": ["Project deliverables", "Restrictions on schedule, cost, or scope that shape the project approach", "Risk owners", "Procurement methods"], "correctAnswer": 1},
        {"question": "Which process involves developing options for schedule compression?", "options": ["Define Activities", "Develop Schedule", "Estimate Activity Resources", "Plan Resource Management"], "correctAnswer": 1},
        {"question": "Project assumptions are documented because:", "options": ["They are always accurate", "They represent uncertainties that can become risks if proven false", "They replace stakeholder input", "They guarantee project success"], "correctAnswer": 1},
        {"question": "A project management office (PMO) supports planning by:", "options": ["Executing project tasks", "Providing governance, standards, and tools for planning", "Approving financial audits", "Managing supplier contracts"], "correctAnswer": 1},
        {"question": "What is a 'work package' in a WBS?", "options": ["An overall project objective", "The lowest level of the WBS where work can be scheduled, estimated, and tracked", "A stakeholder deliverable", "A project milestone"], "correctAnswer": 1},
        {"question": "Which document links WBS components to detailed descriptions?", "options": ["Project Charter", "WBS Dictionary", "Scope Statement", "Risk Register"], "correctAnswer": 1},
        {"question": "The purpose of activity sequencing is to:", "options": ["Assign resources to activities", "Define logical relationships and dependencies between project activities", "Estimate activity durations", "Identify project milestones"], "correctAnswer": 1},
        {"question": "Which risk strategy involves accepting a risk without action?", "options": ["Mitigate", "Accept", "Transfer", "Avoid"], "correctAnswer": 1},
        {"question": "Crashing a project schedule involves:", "options": ["Performing activities in parallel", "Adding resources to critical path activities to reduce duration", "Removing project scope", "Delaying non-critical tasks"], "correctAnswer": 1},
        {"question": "Which type of dependency is inherent to the nature of work?", "options": ["External dependency", "Mandatory dependency", "Discretionary dependency", "Resource dependency"], "correctAnswer": 1},
        {"question": "A project budget is finalized during:", "options": ["Initiation", "Planning", "Execution", "Closure"], "correctAnswer": 1},
        {"question": "The primary purpose of a risk register during planning is to:", "options": ["Track project budgets", "Document identified risks, their probability, impact, and planned responses", "Monitor team performance", "Define stakeholder roles"], "correctAnswer": 1},
        {"question": "Which schedule development technique uses formulas based on historical relationships?", "options": ["Analogous estimating", "Parametric estimating", "Expert judgment", "Three-point estimating"], "correctAnswer": 1}
      ],
      "reading": `### Module 2 Final Exam

**📘 AI Structured Reading**
- **Purpose:** This 51-question exam covers the Planning Performance Domain, including Scope, Schedule, Cost, Quality, Resources, Communications, Risk, and Procurement.
- **Goal:** Aim for high accuracy to ensure you understand how to integrate these elements into a solid Project Management Plan.

**🌍 Practical Tips**
- Understand the difference between various estimating techniques.
- Master the Critical Path Method and schedule compression strategies.
- Know the components of the core baselines.

**🏅 Badge: Planning Professional**`
    }
  ],
  3: [
    {
      "id": "3.1",
      "title": "Procurement Strategy & Contracts",
      "type": "video",
      "youtubeId": "rbjx0NH9XiQ",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "Which contract type carries the most risk for the buyer?",
          "options": ["Fixed-Price (FP)", "Cost-Reimbursable (CR)", "Time & Materials (T&M)", "Lump Sum"],
          "correctAnswer": 1,
          "explanation": "In CR contracts, the buyer pays for all costs, which means they carry the risk of cost overruns."
        },
        {
          "question": "What is the primary purpose of a 'Make-or-Buy' analysis?",
          "options": ["To find the cheapest vendor", "To decide whether to produce work internally or purchase externally", "To calculate the total cost of ownership", "To negotiate contract terms"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 1: Navigating the Procurement Lifecycle

**📘 AI Structured Reading**
- **Objective:** Efficiently manage the acquisition of products and services to deliver project value.
- **Contract Universe:** Fixed-Price (Scope certain), Cost-Reimbursable (High risk/R&D), and T&M (Short-term/Staff augmentation).
- **PMBOK 7 Focus:** Vendor relationships should be partnerships focused on shared value delivery.

**🌍 Real-World Case**
- **Scenario:** A tech startup needs specialized AI processors.
- **Decision:** Perform a Make-or-Buy analysis.
- **Outcome:** Decided to 'Buy' (Procure) to reduce time-to-market by 6 months.

**🏅 Badge: Procurement Strategist**`
    },
    {
      "id": "3.2",
      "title": "Executing for Delivery & Quality",
      "type": "video",
      "youtubeId": "zm8vNIFsl7M",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "In the Delivery Performance Domain, what is the 'Fitness for Purpose' requirement?",
          "options": ["The product must be the most expensive", "The output must satisfy the stakeholder's intended outcome", "The project must be finished early", "Zero defects in all components"],
          "correctAnswer": 1
        },
        {
          "question": "Which activity is central to 'Project Work' execution?",
          "options": ["Managing physical resources and flow of work", "Updating the business case", "Creating the project charter", "Defining organizational strategy"],
          "correctAnswer": 0
        }
      ],
      "reading": `### Subject 2: Driving Value through Execution

**📘 AI Structured Reading**
- **Execution Strategy:** Managing the flow of work and resources to meet delivery goals.
- **Quality Management:** Ensuring deliverables meet 'Fitness for Purpose' and stakeholder requirements.
- **Source Selection:** Evaluating vendors based on technical capability, cost, and historical performance.

**🌍 Real-World Case**
- **Scenario:** Implementing a new CRM system.
- **The Process:** Synchronizing internal data clean-up with vendor software configuration.
- **Outcome:** Successful 'Go-Live' with 95% user adoption due to quality-focused execution.

**🏅 Badge: Delivery Master**`
    },
    {
      "id": "3.3",
      "title": "Vendor Relationship Management",
      "type": "interaction",
      "duration": "25 min",
      "completed": false,
      "reading": `### Subject 3: Mastering Vendor Partnerships

**📘 AI Structured Reading**
- **Collaboration:** Shifting from adversarial to collaborative vendor management.
- **Performance Tracking:** Using SLAs (Service Level Agreements) to monitor vendor delivery quality.
- **Agreements:** Ensuring contracts reflect the adaptive or predictive nature of the project.

**📝 Quick Preparation**
1. Difference between FP and T&M contracts?
2. How does source selection impact project risk?
3. Importance of 'Fitness for Purpose'?

**🏅 Badge: Partnership Expert**`
    },
    {
      "id": "3.4",
      "title": "Module 3: Comprehensive Assessment",
      "type": "interaction",
      "duration": "2h 00m",
      "completed": false,
      "questions": [
        {"question": "The primary goal of the execution process group is:", "options": ["Approving project budgets", "Completing work defined in the project management plan", "Identifying project stakeholders", "Closing vendor contracts"], "correctAnswer": 1},
        {"question": "Procurement management involves:", "options": ["Managing team performance", "Acquiring products, services, or results from outside the project team", "Developing the project schedule", "Identifying project risks"], "correctAnswer": 1},
        {"question": "A Request for Proposal (RFP) is used to:", "options": ["Notify stakeholders of project completion", "Solicit detailed proposals from potential sellers", "Authorize project spending", "Document project risks"], "correctAnswer": 1},
        {"question": "Which contract type places most financial risk on the buyer?", "options": ["Fixed-price contract", "Cost-reimbursable contract", "Time and material contract", "Lump-sum contract"], "correctAnswer": 1},
        {"question": "A fixed-price contract benefits the buyer because:", "options": ["It allows unlimited scope changes", "Costs are known in advance, reducing financial uncertainty", "The seller absorbs no risk", "It is the most flexible contract type"], "correctAnswer": 1},
        {"question": "Which of the following is an output of the Conduct Procurements process?", "options": ["Project charter", "Selected sellers and agreements", "Risk register", "Project schedule"], "correctAnswer": 1},
        {"question": "Direct and Manage Project Work involves:", "options": ["Creating the WBS", "Performing the activities in the project management plan to achieve project objectives", "Closing vendor relationships", "Identifying stakeholders"], "correctAnswer": 1},
        {"question": "A Statement of Work (SOW) in procurement describes:", "options": ["The project schedule", "The detailed scope of products or services to be provided by the seller", "Financial audit requirements", "Risk management strategies"], "correctAnswer": 1},
        {"question": "Which document formalizes the agreement between buyer and seller?", "options": ["Project Charter", "Contract/Agreement", "Risk Register", "Business Case"], "correctAnswer": 1},
        {"question": "Make-or-buy analysis is used to:", "options": ["Schedule project activities", "Decide whether to produce something internally or purchase from an external source", "Identify project risks", "Evaluate project benefits"], "correctAnswer": 1},
        {"question": "Which of the following is a type of contract used in procurement?", "options": ["Risk Matrix Agreement", "Time and Material (T&M) Contract", "Communication Agreement", "Scope Statement Agreement"], "correctAnswer": 1},
        {"question": "During execution, the project manager's primary focus is:", "options": ["Approving project scope changes only", "Leading the team, managing stakeholder engagement, and delivering results", "Developing the WBS", "Conducting feasibility studies"], "correctAnswer": 1},
        {"question": "Change requests during execution are most commonly triggered by:", "options": ["Project closure activities", "Variances from the baseline, new stakeholder requirements, or risks materializing", "Budget finalizations", "Initial planning errors only"], "correctAnswer": 1},
        {"question": "A key output of the Direct and Manage Project Work process is:", "options": ["Project Charter", "Deliverables and work performance data", "Risk Management Plan", "Communication Plan"], "correctAnswer": 1},
        {"question": "Which procurement document is used for simple, low-value purchases?", "options": ["Request for Proposal (RFP)", "Purchase Order (PO)", "Request for Quotation (RFQ)", "Invitation for Bid (IFB)"], "correctAnswer": 1},
        {"question": "Vendor management during execution includes:", "options": ["Approving the business case", "Monitoring vendor performance and ensuring contractual obligations are met", "Developing the project schedule", "Closing the project"], "correctAnswer": 1},
        {"question": "Which technique is used to evaluate seller proposals?", "options": ["Risk matrix", "Source selection criteria and weighting", "Gantt chart analysis", "PERT estimation"], "correctAnswer": 1},
        {"question": "The Close Procurements process involves:", "options": ["Initiating new vendor contracts", "Completing and settling each contract and resolving open items", "Developing the procurement plan", "Scheduling vendor meetings"], "correctAnswer": 1},
        {"question": "Which of the following best describes 'contract administration'?", "options": ["Reviewing project charter", "Managing the relationship and performance during the life of a contract", "Approving project budgets", "Conducting project audits"], "correctAnswer": 1},
        {"question": "A Request for Information (RFI) is issued to:", "options": ["Finalize procurement contracts", "Gather information about vendor capabilities before formal procurement", "Close out vendor agreements", "Document project changes"], "correctAnswer": 1},
        {"question": "Integrated Change Control during execution ensures:", "options": ["All changes are ignored", "Changes are evaluated, approved, or rejected in a controlled manner", "Changes are immediately implemented", "Changes are documented only after implementation"], "correctAnswer": 1},
        {"question": "Which process group involves managing and performing project work?", "options": ["Planning", "Executing", "Initiating", "Closing"], "correctAnswer": 1},
        {"question": "A lessons learned register during execution helps to:", "options": ["Identify project stakeholders", "Capture knowledge for improving current and future projects", "Finalize the project budget", "Define project scope"], "correctAnswer": 1},
        {"question": "Which contract type is most risky for the seller?", "options": ["Cost Plus Fixed Fee (CPFF)", "Firm Fixed Price (FFP)", "Time and Material (T&M)", "Cost Plus Incentive Fee (CPIF)"], "correctAnswer": 1},
        {"question": "What is the purpose of procurement negotiation?", "options": ["To replace the project manager", "To reach agreement on the contract terms before signing", "To define the project scope", "To identify project risks"], "correctAnswer": 1},
        {"question": "Which is an important consideration in source selection?", "options": ["Vendor's project management methodology only", "Price, technical capability, past performance, and quality", "Vendor's office location", "Project manager's preference"], "correctAnswer": 1},
        {"question": "During execution, a status report should include:", "options": ["Project charter revisions", "Work completed, upcoming work, issues, and risks", "Final project deliverables", "Contract amendments only"], "correctAnswer": 1},
        {"question": "A cost-plus-incentive-fee contract incentivizes the seller to:", "options": ["Increase project scope", "Reduce costs below target to share in the savings", "Delay project deliverables", "Avoid risk management"], "correctAnswer": 1},
        {"question": "What is the role of the project manager during procurement?", "options": ["Sign all procurement contracts independently", "Coordinate procurement activities and ensure alignment with project needs", "Negotiate without stakeholder input", "Select vendors based solely on price"], "correctAnswer": 1},
        {"question": "Which document in procurement describes requirements in a format that allows different seller solutions?", "options": ["Statement of Work (SOW)", "Statement of Requirements / Performance-based SOW", "Change Request", "Project Charter"], "correctAnswer": 1},
        {"question": "Which of the following is a performance measurement tool used during execution?", "options": ["WBS", "Earned Value Analysis (EVA)", "Risk Matrix", "Project Charter"], "correctAnswer": 1},
        {"question": "Conflict resolution during execution is best handled by:", "options": ["Ignoring conflicts until they escalate", "Addressing conflicts directly and constructively through open communication", "Escalating all conflicts to senior management immediately", "Removing the conflicting team members"], "correctAnswer": 1},
        {"question": "Quality assurance during execution focuses on:", "options": ["Inspecting final deliverables only", "Auditing processes to ensure quality standards are being followed", "Approving vendor invoices", "Developing the quality management plan"], "correctAnswer": 1},
        {"question": "An issue log during execution is used to:", "options": ["Document project risks", "Track and manage problems that have actually occurred", "Approve project changes", "Record budget variances"], "correctAnswer": 1},
        {"question": "Which process involves putting approved changes into effect?", "options": ["Plan Change Management", "Direct and Manage Project Work (implementing approved changes)", "Identify Stakeholders", "Close Project"], "correctAnswer": 1},
        {"question": "What does 'scope verification' confirm during execution?", "options": ["The project risks are all resolved", "That completed deliverables meet accepted criteria and receive formal acceptance", "The schedule is on track", "Budget is within limits"], "correctAnswer": 1},
        {"question": "A procurement audit assesses:", "options": ["Team member performance", "The effectiveness of procurement processes throughout the project", "Stakeholder satisfaction", "Schedule performance"], "correctAnswer": 1},
        {"question": "Which of the following is a technique for managing team performance?", "options": ["Gantt chart review", "Team performance assessments and feedback", "Procurement audit", "WBS analysis"], "correctAnswer": 1},
        {"question": "The project manager's role during execution primarily requires:", "options": ["Technical expertise only", "Leadership, integration, and communication skills", "Accounting expertise", "Legal knowledge"], "correctAnswer": 1},
        {"question": "An approved change request during execution results in:", "options": ["Automatic project scope reduction", "Updates to the project management plan, scope, schedule, or cost baselines", "Immediate contract termination", "Stakeholder removal from the register"], "correctAnswer": 1},
        {"question": "Which of the following is an output of control procurements?", "options": ["Procurement management plan", "Closed procurements and work performance information", "Project charter", "WBS"], "correctAnswer": 1},
        {"question": "Manage Quality during execution involves:", "options": ["Approving the business case", "Translating quality standards into executable quality activities", "Defining project scope", "Identifying stakeholders"], "correctAnswer": 1},
        {"question": "Which process ensures the right resources are available for project execution?", "options": ["Develop Schedule", "Acquire Resources", "Identify Risks", "Close Project"], "correctAnswer": 1},
        {"question": "What is 'work performance information'?", "options": ["Team member appraisals", "Performance data analyzed in context to provide meaningful insights", "Project charter updates", "Risk management plan"], "correctAnswer": 1},
        {"question": "A kickoff meeting at the start of execution is used to:", "options": ["Close out the project", "Align the team, clarify roles, and launch project work officially", "Finalize the budget", "Identify project risks"], "correctAnswer": 1},
        {"question": "Which of the following describes a time and material contract?", "options": ["A contract with a fixed total price", "A hybrid contract charging for labor hours plus materials at agreed rates", "A contract based solely on deliverable milestones", "A contract with no payment until completion"], "correctAnswer": 1},
        {"question": "Resource leveling in execution means:", "options": ["Reducing the project scope", "Adjusting the schedule to resolve resource conflicts and over-allocation", "Adding more budget to the project", "Fast-tracking the schedule"], "correctAnswer": 1},
        {"question": "Which tool helps the project manager manage day-to-day execution tasks?", "options": ["Project Charter", "Project management information system (PMIS)", "Business Case", "Risk Matrix"], "correctAnswer": 1},
        {"question": "During execution, managing stakeholder engagement includes:", "options": ["Avoiding communication to prevent scope changes", "Keeping stakeholders informed, resolving concerns, and fostering support", "Replacing dissatisfied stakeholders", "Restricting stakeholder access to project information"], "correctAnswer": 1},
        {"question": "A contract change control system manages:", "options": ["Team conflicts", "Modifications to contracts in a structured and documented manner", "Project quality standards", "Schedule baselines"], "correctAnswer": 1},
        {"question": "Which is NOT a valid reason to conduct a procurement?", "options": ["Lack of internal expertise", "To avoid all project risks", "Cost-effectiveness", "Need for specialized equipment"], "correctAnswer": 1}
      ],
      "reading": `### Module 3 Final Exam

**📘 AI Structured Reading**
- **Purpose:** This 51-question exam covers the Delivery Performance Domain, Procurement Management, Project Execution, and Vendor Partnerships.
- **Goal:** Demonstrate your ability to manage work, quality, and external resources effectively.

**🌍 Practical Tips**
- Understand the risks associated with different contract types.
- Focus on the servant leader role in managing team and vendor performance.
- Know how to handle changes and issues during the execution phase.

**🏅 Badge: Execution Pro**`
    }
  ],
  4: [
    {
      "id": "4.1",
      "title": "Identifying & Prioritizing Risk",
      "type": "video",
      "youtubeId": "HVlrxOQoSUw",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "What is the primary purpose of a Risk Register?",
          "options": ["To list project expenses", "To document and categorize project risks", "To assign project tasks", "To record stakeholder meetings"],
          "correctAnswer": 1,
          "explanation": "A risk register is a central repository for all identified risks, their categories, and their current status."
        },
        {
          "question": "The Probability-Impact Matrix is used to:",
          "options": ["Calculate the total project budget", "Rank risks based on their likelihood and severity", "Identify team member skills", "Schedule project milestones"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 1: The Risk Identification Framework
      
**📘 AI Structured Reading**
- **Definition:** Identifying project risks is an ongoing process that surface uncertainties that could impact objectives.
- **Tools:** Risk Register, Probability-Impact Matrix, and Categorization.
- **PMBOK 7 Focus:** Integrating risk identification into the continuous planning cycle to manage ambiguity.

**🌍 Real-World Case**
- **Scenario:** Developing a new solar-powered drone.
- **Risk:** Potential for supply chain delays in specialized battery cells.
- **Action:** Documented in the Risk Register with a high priority based on the Impact Matrix.
- **Outcome:** Diversified suppliers 3 months early to avoid production stalls.

**🏅 Badge: Risk Oracle**`
    },
    {
      "id": "4.2",
      "title": "Quantitative Analysis & Response",
      "type": "video",
      "youtubeId": "GC7pN8Mjot8",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "What does 'Expected Monetary Value' (EMV) help determine?",
          "options": ["The project's final profit", "The average cost of a risk event", "The total value of all assets", "The CEO's salary"],
          "correctAnswer": 1,
          "explanation": "EMV is a statistical concept that calculates the average outcome when the future includes uncertain scenarios."
        },
        {
          "question": "Contingency Reserves are specifically set aside for:",
          "options": ["Unknown unknowns", "The Project Manager's bonus", "Known unknowns (identified risks)", "Marketing expenses"],
          "correctAnswer": 2
        },
        {
          "question": "What is 'Risk Appetite'?",
          "options": ["The list of all threats", "The amount of risk an organization is willing to accept", "The cost of mitigation", "The total project budget"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 2: Risk Analytics & Resource Guarding
      
**📘 AI Structured Reading**
- **Quantitative Analysis:** Using EMV (Expected Monetary Value) and Monte Carlo simulations to model uncertainty.
- **Contingency Reserves:** Budget or time set aside for identified risks ('Known Unknowns').
- **Risk Appetite:** The threshold of uncertainty an organization is willing to tolerate for objectives.
- **PMBOK 7 Focus:** Risk is an inherent part of any project; the goal is to manage it, not eliminate it.

**🌍 Real-World Case**
- **Scenario:** Constructing a high-speed rail link.
- **Analysis:** EMV showed a $5M potential impact for geological delays.
- **Strategy:** Allocated a $4M Contingency Reserve based on high risk appetite for innovation but low for delays.

**🏅 Badge: Resilient Strategist**`
    },
    {
      "id": "4.3",
      "title": "Module 4: Comprehensive Assessment",
      "type": "interaction",
      "duration": "2h 00m",
      "completed": false,
      "questions": [
        {"question": "Project risk is best defined as:", "options": ["A certain negative event", "An uncertain event or condition that, if it occurs, has an effect on project objectives", "A project constraint", "A stakeholder concern"], "correctAnswer": 1},
        {"question": "Which of the following is the correct order of risk management processes?", "options": ["Identify → Plan → Analyze → Respond → Monitor", "Plan → Identify → Analyze → Respond → Monitor", "Analyze → Identify → Plan → Respond → Monitor", "Respond → Plan → Identify → Analyze → Monitor"], "correctAnswer": 1},
        {"question": "A risk register is used to:", "options": ["Track project changes", "Document identified risks, their analysis, and planned responses", "Record budget allocations", "Define project scope"], "correctAnswer": 1},
        {"question": "What is a risk appetite?", "options": ["The amount of budget reserved for risks", "The degree of uncertainty an organization is willing to accept in pursuit of objectives", "The number of risks identified in a project", "The response plan for high-priority risks"], "correctAnswer": 1},
        {"question": "Qualitative risk analysis involves:", "options": ["Calculating the exact financial impact of each risk", "Prioritizing risks by assessing their probability and impact using scales", "Developing detailed risk response plans", "Monitoring risks after project closure"], "correctAnswer": 1},
        {"question": "Quantitative risk analysis uses:", "options": ["Probability-impact matrices", "Numerical techniques such as Monte Carlo simulation and decision tree analysis", "Expert judgment only", "Stakeholder surveys"], "correctAnswer": 1},
        {"question": "A risk response strategy that eliminates the threat is called:", "options": ["Transfer", "Avoid", "Mitigate", "Accept"], "correctAnswer": 1},
        {"question": "Transferring a risk means:", "options": ["Eliminating the risk entirely", "Shifting the negative impact to a third party (e.g., insurance or outsourcing)", "Reducing the probability of the risk", "Accepting the risk without action"], "correctAnswer": 1},
        {"question": "Risk mitigation focuses on:", "options": ["Ignoring low-priority risks", "Reducing the probability or impact of a threat", "Transferring risks to stakeholders", "Accepting all project risks"], "correctAnswer": 1},
        {"question": "A contingency reserve is:", "options": ["Budget added to cover unknown unknowns", "Budget set aside for known risks that may materialize", "A risk response plan", "A budget cut for low-priority activities"], "correctAnswer": 1},
        {"question": "A management reserve is intended for:", "options": ["High-priority risks on the risk register", "Unplanned work arising from unknown unknowns", "Vendor overpayments", "Team performance bonuses"], "correctAnswer": 1},
        {"question": "Which analysis tool maps risk probability against potential impact?", "options": ["Gantt chart", "Probability-impact matrix", "WBS", "Network diagram"], "correctAnswer": 1},
        {"question": "A risk trigger is:", "options": ["The financial impact of a risk", "A warning sign indicating that a risk event is about to occur", "A response to a realized risk", "A risk category in the risk register"], "correctAnswer": 1},
        {"question": "Residual risk refers to:", "options": ["Risks eliminated by the project team", "Risk remaining after risk responses have been implemented", "New risks identified during execution", "Risks transferred to vendors"], "correctAnswer": 1},
        {"question": "Secondary risks are:", "options": ["Risks that occur twice", "New risks created by a risk response action", "Risks with low priority", "Risks identified after project completion"], "correctAnswer": 1},
        {"question": "Which risk response strategy is appropriate for opportunities?", "options": ["Avoid", "Exploit", "Transfer", "Mitigate"], "correctAnswer": 1},
        {"question": "A risk breakdown structure (RBS) is:", "options": ["A hierarchy of project tasks", "A hierarchical categorization of risks organized by type and category", "A budget breakdown by risk", "A list of risk owners"], "correctAnswer": 1},
        {"question": "The risk owner is responsible for:", "options": ["Identifying all project risks", "Monitoring the assigned risk and implementing the response plan", "Approving the project budget", "Managing vendor contracts"], "correctAnswer": 1},
        {"question": "Expected Monetary Value (EMV) is calculated as:", "options": ["Probability \u00d7 Impact in financial terms", "Probability + Impact in financial terms", "Total budget \u00f7 number of risks", "Impact \u00d7 Schedule variance"], "correctAnswer": 0},
        {"question": "Which technique identifies risks by working backward from undesirable outcomes?", "options": ["Risk register review", "Fault tree analysis", "SWOT analysis", "Brainstorming"], "correctAnswer": 1},
        {"question": "A project's risk threshold defines:", "options": ["The number of risks allowed in a project", "The level of risk exposure beyond which risk responses must be taken", "The budget allocated for risks", "The risk register approval criteria"], "correctAnswer": 1},
        {"question": "SWOT analysis in risk management is used to:", "options": ["Develop the project schedule", "Identify internal strengths/weaknesses and external opportunities/threats", "Allocate the risk budget", "Assign risk owners"], "correctAnswer": 1},
        {"question": "The Delphi technique in risk identification involves:", "options": ["A single expert providing risk estimates", "Iterative, anonymous expert consensus to identify and analyze risks", "Statistical simulation of risk outcomes", "Reviewing historical project data"], "correctAnswer": 1},
        {"question": "A risk that has already occurred becomes:", "options": ["A secondary risk", "An issue", "A residual risk", "A trigger"], "correctAnswer": 1},
        {"question": "Monitor Risks process involves:", "options": ["Developing initial risk responses", "Tracking identified risks, identifying new risks, and evaluating risk process effectiveness", "Approving the project charter", "Executing procurement contracts"], "correctAnswer": 1},
        {"question": "Which of the following is a risk identification technique?", "options": ["Gantt charting", "Brainstorming and assumption analysis", "Resource leveling", "Scope definition"], "correctAnswer": 1},
        {"question": "Passive acceptance of a risk means:", "options": ["Transferring the risk to a vendor", "Acknowledging the risk and doing nothing unless it occurs, dealing with it when it does", "Eliminating the risk through mitigation", "Exploiting the risk for benefit"], "correctAnswer": 1},
        {"question": "Active acceptance of a risk involves:", "options": ["Ignoring the risk entirely", "Establishing contingency reserves to be used if the risk occurs", "Transferring the risk to insurance", "Avoiding the risk source"], "correctAnswer": 1},
        {"question": "Monte Carlo simulation in risk management is used to:", "options": ["Identify stakeholders", "Model and simulate the impact of uncertainty on project objectives", "Develop the project schedule", "Audit project quality"], "correctAnswer": 1},
        {"question": "Which factor is used in both qualitative and quantitative risk analysis?", "options": ["Risk register format", "Probability and impact of risk events", "Number of team members", "Procurement contract type"], "correctAnswer": 1},
        {"question": "An overall project risk is:", "options": ["The sum of all individual risks", "The effect of uncertainty on the project as a whole, reflecting aggregate risk exposure", "Only the highest-rated individual risk", "Risk identified at project initiation only"], "correctAnswer": 1},
        {"question": "A risk audit examines:", "options": ["The project's financial statements", "The effectiveness of risk responses and risk management processes", "Team member qualifications", "Vendor performance"], "correctAnswer": 1},
        {"question": "Which risk response is most appropriate when a risk's impact is very high and it can be avoided?", "options": ["Accept", "Avoid", "Mitigate", "Transfer"], "correctAnswer": 1},
        {"question": "Risk escalation is appropriate when:", "options": ["Any risk is identified", "A risk is beyond the project team's authority or capability to respond to", "All risks have been mitigated", "The project is closing"], "correctAnswer": 1},
        {"question": "What is a 'black swan' event in risk management?", "options": ["A common, expected risk", "A rare, unpredictable event with massive impact", "A risk with low probability and low impact", "A transferred risk"], "correctAnswer": 1},
        {"question": "Risk sharing as a response to opportunity means:", "options": ["Dividing the risk cost among the team", "Partnering with others to capture the benefit of an opportunity", "Reducing the impact of a threat", "Accepting a risk without action"], "correctAnswer": 1},
        {"question": "The risk management plan does NOT typically include:", "options": ["Risk categories", "A detailed schedule of all project activities", "Roles and responsibilities for risk management", "Risk probability and impact definitions"], "correctAnswer": 1},
        {"question": "Enhancing an opportunity means:", "options": ["Avoiding actions that could lead to it", "Increasing the probability or impact of a positive risk event", "Transferring it to a third party", "Documenting it without action"], "correctAnswer": 1},
        {"question": "Which document provides the project team with authority to respond to risks?", "options": ["Project scope statement", "Risk management plan and project management plan", "Business case", "Procurement plan"], "correctAnswer": 1},
        {"question": "Tornado diagram in risk analysis is used to:", "options": ["Show project schedule dependencies", "Compare the relative importance of different risk variables on project outcomes", "Track project costs", "Display stakeholder power levels"], "correctAnswer": 1},
        {"question": "Which of the following best defines 'unknown unknowns' in risk management?", "options": ["Risks that have been identified but not assessed", "Risks that cannot be identified or anticipated in advance", "Risks that are accepted without response", "Risks that have been transferred to vendors"], "correctAnswer": 1},
        {"question": "A workaround is a response to:", "options": ["An identified risk before it occurs", "An unplanned risk that has actually materialized without a prior response plan", "A low-priority risk", "A transferred risk"], "correctAnswer": 1},
        {"question": "Which risk measurement considers both probability and financial impact?", "options": ["Risk matrix rating", "Expected Monetary Value (EMV)", "Risk breakdown structure", "Risk audit result"], "correctAnswer": 1},
        {"question": "A risk register update during monitoring reflects:", "options": ["Project scope changes only", "Changes in risk status, new risks, and updates to response plans", "Budget reallocations", "Stakeholder updates"], "correctAnswer": 1},
        {"question": "Which of the following is the best indicator that risk management is effective?", "options": ["No risks are ever identified", "Risks are identified early, responded to proactively, and project objectives are met", "All risks are transferred to vendors", "The project ends with zero contingency reserve remaining"], "correctAnswer": 1},
        {"question": "Risk categorization helps to:", "options": ["Eliminate all high-priority risks", "Group risks by source or type to improve identification and response", "Assign risks to team members randomly", "Define the project scope"], "correctAnswer": 1},
        {"question": "The 'near-miss' concept in risk management refers to:", "options": ["A risk with near-zero probability", "An event that almost caused harm but did not, used as a learning opportunity", "A missed risk trigger", "A risk that was transferred but nearly rejected"], "correctAnswer": 1},
        {"question": "Assumptions analysis during risk identification helps to:", "options": ["Finalize the project budget", "Identify risks arising from assumptions that may be false", "Develop the schedule", "Assign team roles"], "correctAnswer": 1},
        {"question": "Project risk management is the responsibility of:", "options": ["The project manager only", "The entire project team and key stakeholders, led by the project manager", "The PMO exclusively", "External auditors"], "correctAnswer": 1},
        {"question": "Which of the following distinguishes risk from uncertainty?", "options": ["Risk is always negative; uncertainty has no direction", "Risk can be identified and assessed; pure uncertainty cannot be predicted or measured", "Uncertainty is always managed; risk is ignored", "There is no difference between risk and uncertainty"], "correctAnswer": 1}
      ],
      "reading": `### Module 4 Final Exam

**📘 AI Structured Reading**
- **Purpose:** This 50-question exam covers the Uncertainty Performance Domain, Risk Identification, Qualitative and Quantitative analysis, and Response planning.
- **Goal:** Aim for high proficiency in managing project uncertainty and safeguarding value.

**🌍 Practical Tips**
- Understand the difference between threats (negative risks) and opportunities (positive risks).
- Focus on the servant leader role in identifying warnining signs and implementing response plans.
- Know how to handle unknown unknowns using management reserves vs contingency reserves.

**🏅 Badge: Uncertainty Expert**`
    }
  ],
  5: [
    {
      "id": "5.1",
      "title": "KPIs & Performance Metrics",
      "type": "video",
      "youtubeId": "h3ThJLjuhgM",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "What is the primary purpose of the 'Measurement Performance Domain'?",
          "options": ["To punish low-performing team members", "To evaluate project performance and take appropriate action", "To create the highest possible budget", "To increase project duration"],
          "correctAnswer": 1,
          "explanation": "Measurement involves evaluating performance and the response needed to keep the project on track."
        },
        {
          "question": "Which of the following is a 'Leading Indicator'?",
          "options": ["Last month's variance", "The current team morale and backlog velocity", "Total project cost to date", "Final profit margin"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 1: Metrics that Matter

**📘 AI Structured Reading**
- **Objectives:** Establish KPIs (Key Performance Indicators) that align with project outcomes.
- **Concepts:** Leading vs. Lagging indicators, qualitative vs. quantitative metrics.
- **PMBOK 7 Focus:** Measurement should evaluate both delivery and value.

**🌍 Real-World Case**
- **Scenario:** A software deployment project.
- **Metric:** 'Mean Time to Recovery' (MTTR) as a leading indicator of system maturity.
- **Outcome:** Proactive resource allocation reduced downtime by 40%.

**🏅 Badge: Metric Architect**`
    },
    {
      "id": "5.2",
      "title": "Earned Value Management (EVM)",
      "type": "video",
      "youtubeId": "c-YGefS64ss",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "If CPI (Cost Performance Index) is 0.85, what does it mean?",
          "options": ["The project is under budget", "The project is getting 85 cents of value for every dollar spent", "The project is ahead of schedule", "The budget is perfectly managed"],
          "correctAnswer": 1,
          "explanation": "CPI < 1.0 indicates that the project is over budget (getting less value than spent)."
        },
        {
          "question": "What does EAC (Estimate at Completion) represent?",
          "options": ["The original budget", "The expected total cost of the project when finished", "The money already spent", "The cost of the remaining work"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 2: The Math of Performance

**📘 AI Structured Reading**
- **EVM Core:** CV (Cost Variance), SV (Schedule Variance), CPI, and SPI.
- **Forecasting:** Using EAC (Estimate at Completion) and ETC (Estimate to Complete) to predict the future.
- **Variance Analysis:** Investigating the root cause of deviations from the baseline.

**🌍 Real-World Case**
- **Scenario:** Building a high-rise foundation.
- **Status:** CPI is 0.9 (Over budget), but SPI is 1.1 (Ahead of schedule).
- **Decision:** Trade schedule slack for cost savings by reducing overtime.

**🏅 Badge: EVM Strategist**`
    },
    {
      "id": "5.3",
      "title": "Status Reporting & Q&A",
      "type": "video",
      "youtubeId": "H4Pjp4I0Gm8",
      "duration": "30 min",
      "completed": false,
      "reading": `### Subject 3: Communicating Performance

**📘 AI Structured Reading**
- **Trend Analysis:** Looking at patterns over time rather than single data points.
- **Dashboards:** Visualizing complex data for quick stakeholder decision-making.
- **Performance Reviews:** Meetings to evaluate the status of the project and its value.

**📝 Quick Preparation**
1. Difference between SPI and CPI?
2. How to calculate VAC (Variance at Completion)?
3. Why use dashboards for reporting?

**🏅 Badge: Variance Master**`
    },
    {
      "id": "5.4",
      "title": "Module 5: Comprehensive Assessment",
      "type": "interaction",
      "duration": "2h 00m",
      "completed": false,
      "questions": [
        {"question": "Earned Value Management (EVM) is used to:", "options": ["Identify project stakeholders", "Measure project performance against the baseline using cost and schedule", "Document procurement contracts", "Develop the project charter"], "correctAnswer": 1},
        {"question": "Planned Value (PV) represents:", "options": ["Actual cost of work performed", "The authorized budget assigned to scheduled work", "The value of completed deliverables", "The remaining project budget"], "correctAnswer": 1},
        {"question": "Earned Value (EV) represents:", "options": ["Total project budget", "The value of work actually accomplished, measured against the baseline", "Actual costs spent", "Planned costs for future work"], "correctAnswer": 1},
        {"question": "Actual Cost (AC) is:", "options": ["The estimated cost of work scheduled", "The realized cost incurred for work performed", "The budget remaining for the project", "The planned project budget"], "correctAnswer": 1},
        {"question": "Cost Variance (CV) is calculated as:", "options": ["AC - EV", "EV - AC", "PV - EV", "AC - PV"], "correctAnswer": 1},
        {"question": "Schedule Variance (SV) is calculated as:", "options": ["PV - AC", "EV - PV", "EV - AC", "AC - SV"], "correctAnswer": 1},
        {"question": "A Cost Performance Index (CPI) of 0.8 means:", "options": ["The project is 20% ahead of budget", "For every $1 spent, only $0.80 of value is being delivered (over budget)", "The project is 20% behind schedule", "The project is on budget"], "correctAnswer": 1},
        {"question": "A Schedule Performance Index (SPI) greater than 1.0 indicates:", "options": ["The project is over budget", "The project is ahead of schedule", "The project is behind schedule", "The project is on track with the baseline"], "correctAnswer": 1},
        {"question": "Budget at Completion (BAC) is:", "options": ["The current project expenditure", "The total authorized budget for the project at completion", "The remaining budget after actual costs", "The estimated final cost"], "correctAnswer": 1},
        {"question": "Estimate at Completion (EAC) in the typical scenario is calculated as:", "options": ["BAC + AC", "BAC / CPI", "EV + ETC", "PV - CV"], "correctAnswer": 1},
        {"question": "Estimate to Complete (ETC) represents:", "options": ["The total project cost", "The expected cost to finish remaining project work", "The cost variance to date", "The schedule variance to date"], "correctAnswer": 1},
        {"question": "Variance at Completion (VAC) is calculated as:", "options": ["EAC - BAC", "BAC - EAC", "AC - EV", "EV - PV"], "correctAnswer": 1},
        {"question": "To-Complete Performance Index (TCPI) measures:", "options": ["Schedule efficiency needed", "The cost performance efficiency needed to meet budget or EAC target", "Quality compliance rate", "Stakeholder satisfaction index"], "correctAnswer": 1},
        {"question": "Which of the following is a leading indicator of project performance?", "options": ["Actual cost to date", "Schedule Performance Index (SPI)", "Completed deliverables count", "Final project budget"], "correctAnswer": 1},
        {"question": "A burn rate in project management refers to:", "options": ["The rate of team member attrition", "The rate at which the project consumes its budget over time", "The speed of project completion", "The risk exposure level"], "correctAnswer": 1},
        {"question": "Which of the following is an example of a key performance indicator (KPI)?", "options": ["Project team size", "CPI, SPI, milestone completion rate", "Number of stakeholder meetings", "Number of documents produced"], "correctAnswer": 1},
        {"question": "Project tracking involves:", "options": ["Approving the project charter", "Measuring actual performance against planned baselines and reporting status", "Developing the WBS", "Closing vendor contracts"], "correctAnswer": 1},
        {"question": "S-curve in project management visualizes:", "options": ["Risk probability distribution", "Cumulative costs or resource usage over time, often showing slow-fast-slow pattern", "Stakeholder engagement levels", "Team performance metrics"], "correctAnswer": 1},
        {"question": "A project dashboard is used to:", "options": ["Develop the project schedule", "Provide a visual summary of key project metrics and performance at a glance", "Document lessons learned", "Identify project risks"], "correctAnswer": 1},
        {"question": "Status reports in project management serve to:", "options": ["Close the project", "Communicate project performance and progress to stakeholders", "Approve budget changes", "Update the risk register"], "correctAnswer": 1},
        {"question": "Which is the correct interpretation of SV = -$5,000?", "options": ["The project is $5,000 ahead of schedule", "The project is $5,000 behind schedule (less work done than planned)", "The project has saved $5,000", "The project budget has been reduced by $5,000"], "correctAnswer": 1},
        {"question": "Life cycle costing considers:", "options": ["Only construction or development costs", "All costs over the entire life of a product or system, including operations and disposal", "Only direct project costs", "Only indirect project overhead"], "correctAnswer": 1},
        {"question": "Direct costs in project management are:", "options": ["Costs shared across multiple projects", "Costs directly attributable to a specific project deliverable or activity", "Administrative overhead costs", "Risk reserve funds"], "correctAnswer": 1},
        {"question": "Indirect costs include:", "options": ["Labor costs for specific project tasks", "Overhead costs such as utilities, rent, and administration", "Procurement costs", "Equipment purchased for the project"], "correctAnswer": 1},
        {"question": "Sunk costs in decision-making should:", "options": ["Always be included in future cost estimates", "Be excluded from future decision-making since they are irrecoverable", "Be transferred to the risk reserve", "Be included as part of EAC"], "correctAnswer": 1},
        {"question": "Which of the following best describes cost baseline?", "options": ["The initial rough estimate", "The approved, time-phased budget used to measure cost performance", "The contingency reserve amount", "The final project cost"], "correctAnswer": 1},
        {"question": "A Forecast report in project management provides:", "options": ["Historical cost data only", "Projected future performance based on current trends and data", "Risk assessment results", "Stakeholder satisfaction metrics"], "correctAnswer": 1},
        {"question": "Which of the following performance measurements is used to compare schedule progress?", "options": ["CPI", "SPI", "VAC", "TCPI"], "correctAnswer": 1},
        {"question": "Work performance reports are outputs of which process?", "options": ["Direct and Manage Project Work", "Monitor and Control Project Work", "Plan Project Management", "Close Project"], "correctAnswer": 1},
        {"question": "Tracking dependencies between activities is important because:", "options": ["It reduces project costs", "It helps predict how delays in one activity will impact others and the overall schedule", "It identifies stakeholders", "It approves changes"], "correctAnswer": 1},
        {"question": "An activity that is on the critical path has:", "options": ["The most resources assigned", "Zero float and directly impacts the project end date if delayed", "The lowest cost", "The most risk"], "correctAnswer": 1},
        {"question": "Trend analysis in project tracking is used to:", "options": ["Define project scope", "Examine project results over time to predict future performance", "Develop the risk register", "Approve stakeholder changes"], "correctAnswer": 1},
        {"question": "A traffic light reporting system uses:", "options": ["Numerical scores for performance", "Red/Amber/Green (RAG) color coding to communicate project health status", "Percentage completion only", "Financial reports exclusively"], "correctAnswer": 1},
        {"question": "Scope performance measurement ensures:", "options": ["The project is on budget", "Deliverables are completed as defined and accepted by stakeholders", "All risks are resolved", "Vendor contracts are closed"], "correctAnswer": 1},
        {"question": "Which EVM metric best predicts future cost efficiency?", "options": ["SV", "CPI", "PV", "BAC"], "correctAnswer": 1},
        {"question": "Which of the following represents the worst project scenario in EVM?", "options": ["CPI > 1 and SPI > 1", "CPI < 1 and SPI < 1", "CPI = 1 and SPI = 1", "CPI > 1 and SPI < 1"], "correctAnswer": 1},
        {"question": "Cost aggregation involves:", "options": ["Listing all project risks", "Summing estimated costs of work packages upward to determine the project budget", "Assigning tasks to team members", "Developing the communications plan"], "correctAnswer": 1},
        {"question": "Which chart plots cumulative project costs over time?", "options": ["Bar chart", "S-curve", "Gantt chart", "Risk matrix"], "correctAnswer": 1},
        {"question": "A project's cost control process aims to:", "options": ["Maximize project spending", "Monitor cost variances and manage changes to the cost baseline", "Eliminate all project risks", "Finalize stakeholder engagement plans"], "correctAnswer": 1},
        {"question": "Earned Schedule (ES) is an extension of EVM that measures:", "options": ["Monetary value of work performed", "Schedule performance in time units rather than cost units", "Quality of deliverables", "Resource utilization"], "correctAnswer": 1},
        {"question": "Which of the following is a lagging indicator in project performance?", "options": ["SPI at week 3", "Final cost at project completion", "Risk probability level", "CPI trend over weeks"], "correctAnswer": 1},
        {"question": "A project's financial health is best communicated using:", "options": ["Team meeting notes", "Earned Value reports showing CPI, SPI, EAC, and VAC", "The project charter", "The WBS dictionary"], "correctAnswer": 1},
        {"question": "Bottom-up cost estimating means:", "options": ["Using historical project data for estimates", "Estimating individual activities and aggregating upward to get total project cost", "Applying a percentage to prior project costs", "Using executive judgment for overall cost"], "correctAnswer": 1},
        {"question": "Which best describes 'cost realism' in project planning?", "options": ["Setting very low budgets to challenge the team", "Ensuring cost estimates are accurate, complete, and achievable", "Ignoring indirect costs", "Minimizing contingency reserves"], "correctAnswer": 1},
        {"question": "Variance analysis in project management involves:", "options": ["Reviewing contract terms", "Comparing planned vs. actual performance to identify deviations", "Scheduling team meetings", "Updating the risk register"], "correctAnswer": 1},
        {"question": "A project contingency reserve is typically based on:", "options": ["Random allocation", "Risk analysis results including probability and impact of identified risks", "The project manager's experience only", "Vendor pricing estimates"], "correctAnswer": 1},
        {"question": "Which metric is used to measure schedule efficiency in time (not cost)?", "options": ["CPI", "SPI (in Earned Schedule methodology)", "VAC", "BAC"], "correctAnswer": 1},
        {"question": "Resource cost rates are used in project planning to:", "options": ["Identify project risks", "Estimate the cost of resources needed for project activities", "Define project scope", "Develop the communication plan"], "correctAnswer": 1},
        {"question": "Which of the following describes 'project financial reporting'?", "options": ["Preparing audited financial statements", "Communicating budget status, cost variances, and forecasts to stakeholders", "Processing payroll for team members", "Approving procurement contracts"], "correctAnswer": 1},
        {"question": "Re-baselining a project should occur when:", "options": ["Minor variances appear in any given week", "Approved scope changes significantly alter the original baseline", "The project manager decides unilaterally", "Budget reserves are used"], "correctAnswer": 1}
      ],
      "reading": `### Module 5 Final Exam

**📘 AI Structured Reading**
- **Purpose:** This 50-question exam covers the Measurement Performance Domain, EVM (Earned Value Management), Tracking, and Costing indices.
- **Goal:** Master the analytical side of project management to ensure projects remain on track and provide transparency.

**🌍 Practical Tips**
- Memorize the key formulas for CPI, SPI, CV, and SV.
- Understand how to interpret these indices to predict future performance.
- Focus on the servant leader role in providing objective performance data to stakeholders.

**🏅 Badge: Metric Guru**`
    }
  ],
  6: [
    {
      "id": "6.1",
      "title": "Leadership & Team Development",
      "type": "video",
      "youtubeId": "UNlbxTwa3Gw",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "Which leadership style in PMBOK 7 focuses on serving the team and removing impediments?",
          "options": ["Autocratic", "Servant Leadership", "Transactional", "Laissez-faire"],
          "correctAnswer": 1,
          "explanation": "Servant leadership is a core principle of PMBOK 7 focused on supporting the team's growth and delivery."
        },
        {
          "question": "What are the stages of the Tuckman Model?",
          "options": ["Start, Middle, End", "Forming, Storming, Norming, Performing, Adjourning", "Planning, Executing, Monitoring", "Concept, Build, Test, Release"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 1: The Human Element
      
**📘 AI Structured Reading**
- **Servant Leadership:** Prioritizing team needs to foster a high-performance culture.
- **Tuckman Model:** Navigating the stages of team development (Forming to Performing).
- **Situational Leadership:** Adapting your style based on the team's maturity and the task at hand.

**🌍 Real-World Case**
- **Scenario:** A new agile team is stuck in the 'Storming' phase with frequent conflicts.
- **Action:** The PM facilitates a 'Team Charter' session to define norms and values.
- **Outcome:** Team transitioned to 'Norming' within two sprints, increasing velocity by 25%.

**🏅 Badge: Team Catalyst**`
    },
    {
      "id": "6.2",
      "title": "Resource Management & Staffing",
      "type": "video",
      "youtubeId": "eDCUxjLEfRw",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "What does a RACI matrix define?",
          "options": ["Project budget", "Responsible, Accountable, Consulted, Informed roles", "Risk impact levels", "Resource cost per hour"],
          "correctAnswer": 1,
          "explanation": "RACI is a common type of responsibility assignment matrix (RAM) to clarify roles."
        },
        {
          "question": "A Resource Histogram is primarily used to:",
          "options": ["Calculate profit", "Visualize resource allocation over time", "Identify project risks", "Draft the project charter"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 2: Mastering Resource Flow
      
**📘 AI Structured Reading**
- **RACI Matrix:** Clarifying who is Responsible and Accountable for each work package.
- **Resource Histogram:** Identifying overallocation or gaps in the staffing plan.
- **Staffing Management:** Strategies for acquiring, developing, and releasing project personnel.

**🌍 Real-World Case**
- **Scenario:** Unexpected loss of a lead developer during a critical phase.
- **Strategy:** Reviewing the RACI to identify 'Informed' parties who can step up, supported by a Resource Histogram analysis.
- **Outcome:** Minimal impact on schedule due to clear secondary cross-training.

**🏅 Badge: Resource Master**`
    },
    {
      "id": "6.3",
      "title": "Conflict & Motivation",
      "type": "interaction",
      "duration": "25 min",
      "completed": false,
      "reading": `### Subject 3: The Psychology of High Performance

**📘 AI Structured Reading**
- **Emotional Intelligence (EQ):** Self-awareness, self-management, social awareness, and relationship management.
- **Motivation:** Applying theories like Maslow and Herzberg to project environments.
- **Conflict Resolution:** Techniques including Collaborate/Problem Solve, Compromise, and Smooth/Accommodate.

**📝 Quick Preparation**
1. When is 'Collaboration' the best conflict strategy?
2. Define Emotional Intelligence in the context of PMP.
3. Why is a Team Charter essential?

**🏅 Badge: People Architect**`
    },
    {
      "id": "6.4",
      "title": "Module 6: Comprehensive Assessment",
      "type": "interaction",
      "duration": "2h 00m",
      "completed": false,
      "questions": [
        {"question": "Which leadership style involves making decisions without team input?", "options": ["Democratic", "Autocratic", "Laissez-faire", "Transformational"], "correctAnswer": 1},
        {"question": "Transformational leadership focuses on:", "options": ["Enforcing rules strictly", "Inspiring and motivating the team to achieve a shared vision", "Micromanaging tasks", "Rewarding performance only financially"], "correctAnswer": 1},
        {"question": "According to Tuckman's model, team development stages in order are:", "options": ["Forming, Storming, Norming, Performing, Adjourning", "Forming, Norming, Storming, Performing, Adjourning", "Storming, Forming, Norming, Performing, Adjourning", "Forming, Performing, Norming, Storming, Adjourning"], "correctAnswer": 0},
        {"question": "A high-performing team is characterized by:", "options": ["Avoiding all conflicts", "Trust, open communication, shared goals, and complementary skills", "Working independently without collaboration", "Always agreeing with leadership"], "correctAnswer": 1},
        {"question": "Maslow's Hierarchy of Needs suggests that motivation begins with:", "options": ["Self-actualization", "Physiological (basic) needs", "Esteem needs", "Social needs"], "correctAnswer": 1},
        {"question": "Herzberg's Two-Factor Theory distinguishes between:", "options": ["Intrinsic and extrinsic goals", "Hygiene factors (preventing dissatisfaction) and motivators (driving satisfaction)", "Short-term and long-term rewards", "Individual and group performance"], "correctAnswer": 1},
        {"question": "McGregor's Theory X assumes that employees:", "options": ["Are inherently motivated and seek responsibility", "Dislike work and need to be controlled and directed", "Are best managed with autonomy", "Always act in the organization's best interest"], "correctAnswer": 1},
        {"question": "McGregor's Theory Y assumes that employees:", "options": ["Require strict supervision", "Are self-motivated and capable of self-direction when committed", "Are motivated only by financial rewards", "Avoid responsibility"], "correctAnswer": 1},
        {"question": "A project manager using emotional intelligence (EI) focuses on:", "options": ["Technical skills exclusively", "Self-awareness, empathy, and managing relationships effectively", "Strict schedule adherence only", "Financial reporting"], "correctAnswer": 1},
        {"question": "Conflict resolution by 'collaborating' involves:", "options": ["One party giving up their position", "Both parties working together to find a mutually satisfactory solution", "Ignoring the conflict", "An authority figure making the decision"], "correctAnswer": 1},
        {"question": "Which conflict resolution approach produces a win-win outcome?", "options": ["Forcing", "Collaborating/Problem Solving", "Smoothing", "Withdrawing"], "correctAnswer": 1},
        {"question": "Servant leadership in project management means:", "options": ["Following all team requests without question", "Prioritizing the needs of the team to enable their best performance", "Delegating all decisions to team members", "Avoiding leadership responsibilities"], "correctAnswer": 1},
        {"question": "A project manager's soft skills include:", "options": ["Cost estimation expertise", "Communication, negotiation, empathy, and conflict resolution", "Technical programming skills", "Financial auditing"], "correctAnswer": 1},
        {"question": "Which motivational theory focuses on expectancy, instrumentality, and valence?", "options": ["Maslow's Hierarchy of Needs", "Vroom's Expectancy Theory", "Herzberg's Two-Factor Theory", "McClelland's Achievement Theory"], "correctAnswer": 1},
        {"question": "A resource management plan describes:", "options": ["Risk identification methods", "How project team resources will be estimated, acquired, managed, and released", "Budget allocation details", "Communication protocols"], "correctAnswer": 1},
        {"question": "Staff planning includes:", "options": ["Developing the risk register", "Determining the types and numbers of people needed for the project", "Closing vendor contracts", "Documenting lessons learned"], "correctAnswer": 1},
        {"question": "Which team development activity helps build trust and cohesion?", "options": ["Individual performance reviews only", "Team-building activities, workshops, and co-location", "Strict performance management", "Budget reviews"], "correctAnswer": 1},
        {"question": "Delegation in project management is important because:", "options": ["It removes responsibility from the project manager", "It empowers team members and allows the project manager to focus on higher-level activities", "It avoids accountability", "It reduces project costs"], "correctAnswer": 1},
        {"question": "Virtual teams present which unique challenge?", "options": ["Too much face-to-face interaction", "Communication barriers, time zones, and lack of personal connection", "Over-reliance on formal documents", "Excessive team cohesion"], "correctAnswer": 1},
        {"question": "A responsibility assignment matrix (RAM/RACI) helps by:", "options": ["Scheduling all project activities", "Defining and communicating roles and responsibilities clearly", "Identifying project risks", "Allocating the project budget"], "correctAnswer": 1},
        {"question": "Coaching as a leadership approach is best described as:", "options": ["Providing strict instructions with no flexibility", "Helping team members develop skills and reach their potential through guidance", "Ignoring underperformance", "Assigning all complex tasks to top performers"], "correctAnswer": 1},
        {"question": "The 'storming' stage in team development is characterized by:", "options": ["High performance and trust", "Conflict, competition, and clarification of roles and goals", "Team dissolution", "Initial introductions"], "correctAnswer": 1},
        {"question": "Which leadership model focuses on matching leadership style to the team member's development level?", "options": ["Transformational leadership", "Situational Leadership (Hersey and Blanchard)", "Servant leadership", "Autocratic leadership"], "correctAnswer": 1},
        {"question": "Ground rules for a project team serve to:", "options": ["Restrict team creativity", "Establish expectations for team behavior and interactions", "Define project deliverables", "Allocate budget"], "correctAnswer": 1},
        {"question": "Which of the following best supports psychological safety in a team?", "options": ["Penalizing mistakes harshly", "Encouraging open communication, questions, and learning without fear of judgment", "Restricting team discussions", "Assigning blame for failures"], "correctAnswer": 1},
        {"question": "McClelland's Theory identifies three primary needs. Which is NOT one of them?", "options": ["Achievement", "Financial Security", "Affiliation", "Power"], "correctAnswer": 1},
        {"question": "Effective team communication requires:", "options": ["Communicating only in formal written reports", "Clarity, active listening, feedback loops, and appropriate channels", "Limiting communication to the project manager", "Weekly email-only updates"], "correctAnswer": 1},
        {"question": "Which of the following is an example of extrinsic motivation?", "options": ["Personal satisfaction from solving a complex problem", "A performance bonus for completing the project on time", "Enjoyment of the work itself", "Desire for personal mastery"], "correctAnswer": 1},
        {"question": "A project manager who 'leads by example' demonstrates:", "options": ["Micromanagement", "Integrity, commitment, and behavior consistent with project values", "Delegating all tasks", "Avoiding conflict"], "correctAnswer": 1},
        {"question": "Team performance assessments are used to:", "options": ["Replace underperforming team members immediately", "Identify strengths, gaps, and improvements in team functioning and individual performance", "Close out the project", "Update the WBS"], "correctAnswer": 1},
        {"question": "Which of the following best describes 'resource smoothing'?", "options": ["Reducing the team size", "Adjusting resource usage within float to stay within availability limits without extending the schedule", "Adding more resources to the project", "Fast-tracking the schedule"], "correctAnswer": 1},
        {"question": "A project team charter defines:", "options": ["The project's risk management strategy", "Team values, agreements, operating guidelines, and how the team will work together", "The project schedule", "Procurement contracts"], "correctAnswer": 1},
        {"question": "Conflict in project teams can be:", "options": ["Always destructive", "Both constructive (fostering creativity) and destructive (damaging relationships)", "Always positive", "Irrelevant to project outcomes"], "correctAnswer": 1},
        {"question": "Which of the following is an advantage of co-located teams?", "options": ["Reduced communication costs only", "Better collaboration, faster decision-making, and stronger team cohesion", "Lower team salaries", "Reduced need for planning"], "correctAnswer": 1},
        {"question": "Which theory suggests people are motivated by growth, relatedness, and existence needs?", "options": ["Maslow's Hierarchy of Needs", "Alderfer's ERG Theory", "Herzberg's Two-Factor Theory", "Vroom's Expectancy Theory"], "correctAnswer": 1},
        {"question": "A staffing management plan defines:", "options": ["Budget allocations for staff", "When and how team members will be acquired, utilized, and released", "Risk categories", "Procurement processes"], "correctAnswer": 1},
        {"question": "Managing cross-cultural teams requires:", "options": ["Applying a single management style to all cultures", "Cultural awareness, sensitivity, and adapting communication and leadership styles", "Avoiding cultural differences", "Standardizing all team practices globally"], "correctAnswer": 1},
        {"question": "A 'T-shaped' team member has:", "options": ["Only deep technical skills in one area", "Deep expertise in one area combined with broad knowledge across multiple areas", "Broad knowledge but no specialization", "No technical skills"], "correctAnswer": 1},
        {"question": "Which leadership approach is most effective in a crisis situation?", "options": ["Laissez-faire", "Directive/Autocratic — providing clear instructions and immediate decisions", "Democratic — gathering all opinions before deciding", "Servant leadership"], "correctAnswer": 1},
        {"question": "The primary purpose of a project kickoff meeting related to teams is:", "options": ["To finalize procurement contracts", "To introduce team members, clarify roles, align on goals, and build team cohesion", "To close out prior project phases", "To update the risk register"], "correctAnswer": 1},
        {"question": "Why is recognizing and rewarding team performance important?", "options": ["It increases project costs", "It motivates the team, reinforces desired behaviors, and improves morale", "It replaces the need for leadership", "It guarantees project success"], "correctAnswer": 1},
        {"question": "Resource histogram is used to:", "options": ["Track project schedule milestones", "Display resource usage over time, helping identify over- and under-allocation", "Show risk probability distribution", "Communicate stakeholder engagement"], "correctAnswer": 1},
        {"question": "Which of the following best describes 'interpersonal skills' in project management?", "options": ["Technical programming skills", "Ability to interact effectively with others, including communication, empathy, and influence", "Financial forecasting ability", "Scheduling expertise"], "correctAnswer": 1},
        {"question": "Acquiring resources for a project involves:", "options": ["Purchasing physical equipment only", "Obtaining the human and material resources needed to complete the project", "Identifying project risks", "Developing the project charter"], "correctAnswer": 1},
        {"question": "A 'mentor' relationship in a project team:", "options": ["Replaces formal training", "Provides guidance, knowledge sharing, and career development support", "Is only for junior team members", "Is managed exclusively by HR"], "correctAnswer": 1},
        {"question": "Preventing scope creep in team management requires:", "options": ["Accepting all team requests immediately", "Clearly defined scope, strong change management, and team education about boundaries", "Removing team members who suggest changes", "Avoiding documentation"], "correctAnswer": 1},
        {"question": "A 'performance improvement plan' is appropriate when:", "options": ["A team member excels", "A team member is underperforming and needs structured support to meet expectations", "A project milestone is reached", "The project closes"], "correctAnswer": 1},
        {"question": "Which of the following is a characteristic of an effective project manager?", "options": ["Avoids all conflict", "Adapts leadership style, communicates clearly, and builds trust with the team", "Makes all decisions independently", "Focuses only on technical deliverables"], "correctAnswer": 1},
        {"question": "Team co-location ('war room') benefits projects by:", "options": ["Increasing project costs", "Enabling rapid communication, faster problem-solving, and stronger team bonding", "Isolating team members from stakeholders", "Reducing team accountability"], "correctAnswer": 1},
        {"question": "Which aspect of leadership is most critical in agile project environments?", "options": ["Command and control", "Facilitation, empowerment, and continuous team improvement", "Strict hierarchy", "Annual performance reviews"], "correctAnswer": 1}
      ],
      "reading": `### Module 6 Final Exam

**📘 AI Structured Reading**
- **Purpose:** This 50-question exam covers the Team Performance Domain, Leadership styles, Motivational theories, and Conflict Management.
- **Goal:** Refine your ability to lead high-performing teams and communicate effectively as a project leader.

**🌍 Practical Tips**
- Understand the different motivational theories (Maslow, Herzberg, McClelland).
- Focus on the servant leader role in fostering trust and psychological safety.
- Know the stages of team development and how to adapt your leadership accordingly.

**🏅 Badge: Leadership Maestro**`
    }
  ],
  7: [
    {
      "id": "7.1",
      "title": "Quality Planning & Standards",
      "type": "video",
      "youtubeId": "o_vexQUWH4s",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "What is the primary difference between Quality and Grade?",
          "options": ["They are the same thing", "Quality is fulfillment of requirements; Grade is a category of technical characteristics", "Grade is more important than Quality", "Quality is only for software; Grade is for hardware"],
          "correctAnswer": 1,
          "explanation": "High quality means meeting requirements; a low-grade product can still be high quality if it meets its simple requirements."
        },
        {
          "question": "The 'Cost of Quality' (CoQ) includes:",
          "options": ["Only the cost of testing", "Prevention, Appraisal, and Failure costs", "The price of the raw materials", "The Project Manager's salary"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 1: Building Quality In
      
**📘 AI Structured Reading**
- **Definition:** Quality is the degree to which a set of inherent characteristics fulfills requirements.
- **Fitness for Purpose:** The product must satisfy the stakeholder's intended outcome.
- **Cost of Quality:** Balancing the cost of prevention (training, process) vs the cost of failure (rework, warranty).

**🌍 Real-World Case**
- **Scenario:** Manufacturing a medical device.
- **Standards:** ISO 9001 and strict regulatory compliance.
- **Action:** Investing heavily in 'Appraisal' (testing) and 'Prevention' to avoid catastrophic 'External Failure'.
- **Outcome:** Zero recalls in 5 years, establishing market trust and value.

**🏅 Badge: Quality Architect**`
    },
    {
      "id": "7.2",
      "title": "Quality Tools & Analytics",
      "type": "video",
      "youtubeId": "s-krg3VLjbg",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "The Pareto Principle (80/20 rule) suggests that:",
          "options": ["80% of work is done by 20% of people", "80% of problems come from 20% of causes", "20% of the budget is for quality", "80% of stakeholders are uninterested"],
          "correctAnswer": 1,
          "explanation": "Pareto analysis helps identify the 'vital few' causes that result in the majority of defects."
        },
        {
          "question": "Control Charts are used primarily to:",
          "options": ["Track project expenses", "Determine if a process is stable and predictable", "Assign team roles", "Create the WBS"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 2: Measuring for Excellence
      
**📘 AI Structured Reading**
- **Pareto Diagrams:** Identifying the 20% of causes that create 80% of defects.
- **Control Charts:** Monitoring process stability using upper and lower control limits.
- **Six Sigma:** A set of techniques for process improvement aimed at near-perfection.

**🌍 Real-World Case**
- **Scenario:** Data center uptime management.
- **Tools:** Using Control Charts to monitor server latency.
- **Outcome:** Identified 'Out-of-Control' spikes caused by a specific API call, allowing for targeted fix before system crash.

**🏅 Badge: Analytical Vanguard**`
    },
    {
      "id": "7.3",
      "title": "Continuous Improvement & DoD",
      "type": "interaction",
      "duration": "25 min",
      "completed": false,
      "reading": `### Subject 3: The Culture of Improvement
      
**📘 AI Structured Reading**
- **Definition of Done (DoD):** A shared understanding of what it means for work to be complete and of quality.
- **Continuous Improvement:** Using PDCA (Plan-Do-Check-Act) or Kaizen to iteratively improve processes.
- **Compliance:** Ensuring the project meets external legal or industry standards.

**📝 Quick Preparation**
1. Difference between QA (Prevention) and QC (Detection)?
2. What happens if 'Grade' is low but 'Quality' is high?
3. Importance of a clear 'Definition of Done'?

**🏅 Badge: Excellence Driver**`
    },
    {
      "id": "7.4",
      "title": "Module 7: Comprehensive Assessment",
      "type": "interaction",
      "duration": "2h 00m",
      "completed": false,
      "questions": [
        {"question": "Quality in project management means:", "options": ["Adding as many features as possible", "Conforming to requirements and fitness for purpose", "Exceeding all stakeholder expectations", "Completing the project as quickly as possible"], "correctAnswer": 1},
        {"question": "Which quality management approach focuses on continuous improvement?", "options": ["Six Sigma", "Total Quality Management (TQM)", "ISO 9001 only", "Kaizen"], "correctAnswer": 3},
        {"question": "The cost of quality includes:", "options": ["Only the cost of defects", "Cost of conformance (prevention + appraisal) and cost of non-conformance (failures)", "The total project budget", "Only quality auditing costs"], "correctAnswer": 1},
        {"question": "Prevention costs are:", "options": ["Costs for fixing defects after delivery", "Costs incurred to prevent defects from occurring", "Costs of external quality audits", "Costs of rework"], "correctAnswer": 1},
        {"question": "A quality audit is:", "options": ["A review of project financials", "An independent review to determine whether quality processes are being followed", "A test of project deliverables only", "A stakeholder satisfaction survey"], "correctAnswer": 1},
        {"question": "Fitness for purpose means:", "options": ["The product meets exact technical specifications only", "The product fulfills the intended use and meets user needs", "The product is aesthetically pleasing", "The product is the cheapest option"], "correctAnswer": 1},
        {"question": "A control chart is used to:", "options": ["Define project milestones", "Monitor process stability and identify when a process is out of control", "Plan project activities", "Identify project stakeholders"], "correctAnswer": 1},
        {"question": "Which of the following is NOT a quality management process in PMBOK?", "options": ["Plan Quality Management", "Execute Quality Management", "Manage Quality", "Control Quality"], "correctAnswer": 1},
        {"question": "A Pareto chart is used to:", "options": ["Show project schedule", "Identify the most significant causes of defects using the 80/20 rule", "Track project costs", "Monitor team performance"], "correctAnswer": 1},
        {"question": "Six Sigma targets:", "options": ["Eliminating all project risks", "Reducing defects to fewer than 3.4 per million opportunities", "Achieving 100% stakeholder satisfaction", "Completing projects 6 weeks ahead of schedule"], "correctAnswer": 1},
        {"question": "A fishbone (Ishikawa) diagram helps to:", "options": ["Plan project activities", "Identify root causes of quality problems by categorizing potential causes", "Track project budgets", "Monitor schedule performance"], "correctAnswer": 1},
        {"question": "Quality planning in a project involves:", "options": ["Inspecting deliverables after completion", "Identifying quality standards and determining how to satisfy them", "Closing quality audits", "Assigning quality roles to team members"], "correctAnswer": 1},
        {"question": "Which quality tool involves data collection to identify patterns or frequency of problems?", "options": ["Control chart", "Checksheet / Tally sheet", "Scatter diagram", "Pareto chart"], "correctAnswer": 1},
        {"question": "A scatter diagram shows:", "options": ["Project schedule", "The relationship between two variables to identify potential correlations", "Team performance levels", "Budget allocations"], "correctAnswer": 1},
        {"question": "The Plan-Do-Check-Act (PDCA) cycle is associated with:", "options": ["Risk management", "Continuous quality improvement", "Schedule development", "Stakeholder management"], "correctAnswer": 1},
        {"question": "Gold plating in project management refers to:", "options": ["Using expensive materials for deliverables", "Adding features or work beyond what was requested without stakeholder approval", "Exceeding quality standards intentionally", "Spending budget reserves on quality"], "correctAnswer": 1},
        {"question": "Quality assurance (QA) focuses on:", "options": ["Inspecting the final product", "Ensuring quality processes and methods are being followed", "Fixing defects in deliverables", "Developing the quality management plan"], "correctAnswer": 1},
        {"question": "Quality control (QC) focuses on:", "options": ["Auditing processes for compliance", "Monitoring specific project results to determine if they meet quality standards", "Developing quality policies", "Identifying process improvements"], "correctAnswer": 1},
        {"question": "Acceptance criteria define:", "options": ["The project budget limits", "The conditions that must be met for a deliverable to be accepted by the customer", "The team's performance standards", "The vendor selection criteria"], "correctAnswer": 1},
        {"question": "Benchmarking in quality management means:", "options": ["Setting internal quality standards without external reference", "Comparing project processes and practices to best practices or similar projects", "Creating project baselines", "Tracking project milestones"], "correctAnswer": 1},
        {"question": "A quality management plan describes:", "options": ["The risk response strategies", "Quality roles, standards, objectives, tools, and quality assurance and control activities", "The project schedule", "Budget allocations"], "correctAnswer": 1},
        {"question": "Which of the following is a key principle of modern quality management?", "options": ["Inspecting quality into the product after completion", "Building quality in from the start (prevention over inspection)", "Limiting quality investment to reduce costs", "Delegating quality to vendors only"], "correctAnswer": 1},
        {"question": "Defect repair in quality management means:", "options": ["Accepting defects as part of the project", "Reworking or replacing a component that does not meet quality requirements", "Documenting defects for future reference only", "Reducing quality standards to avoid rework"], "correctAnswer": 1},
        {"question": "The '7 basic quality tools' include which of the following?", "options": ["Gantt chart and WBS", "Fishbone diagram, Pareto chart, control chart, scatter diagram, flowchart, histogram, checksheet"], "correctAnswer": 1},
        {"question": "ISO 9001 is an international standard for:", "options": ["Environmental management", "Quality management systems", "Project schedule management", "Risk management"], "correctAnswer": 1},
        {"question": "Which of the following is a measure of process quality?", "options": ["Planned Value (PV)", "Process capability index (Cpk)", "Schedule Variance (SV)", "Resource utilization rate"], "correctAnswer": 1},
        {"question": "Tolerance in quality management defines:", "options": ["How much overtime the team can work", "The acceptable range of variation within which a result is still considered acceptable", "The budget flexibility", "The stakeholder's preferences"], "correctAnswer": 1},
        {"question": "A histogram in quality management is used to:", "options": ["Show project timeline", "Display the distribution of a data set to identify patterns", "Map stakeholder power levels", "Track procurement spending"], "correctAnswer": 1},
        {"question": "Which quality improvement approach uses DMAIC (Define, Measure, Analyze, Improve, Control)?", "options": ["Total Quality Management", "Six Sigma", "Kaizen", "Lean"], "correctAnswer": 1},
        {"question": "Statistical sampling in quality control involves:", "options": ["Testing every single unit of output", "Inspecting a representative subset of the population to draw conclusions", "Conducting quality audits", "Developing quality standards"], "correctAnswer": 1},
        {"question": "A quality baseline defines:", "options": ["The project schedule baseline", "The quality objectives for the project against which performance will be measured", "The risk management baseline", "The procurement baseline"], "correctAnswer": 1},
        {"question": "The cost of non-conformance includes:", "options": ["Training and prevention activities", "Internal failures (rework) and external failures (warranty, liability)", "Quality auditing costs", "Testing and inspection costs"], "correctAnswer": 1},
        {"question": "Which of the following best defines 'grade' vs. 'quality'?", "options": ["They are the same concept", "Grade refers to feature level; quality refers to conformance to requirements", "Grade is always higher than quality", "Quality is a subset of grade"], "correctAnswer": 1},
        {"question": "A quality checklist is used to:", "options": ["Define project scope", "Verify that required steps or tasks have been completed during quality control", "Track project costs", "Assign team responsibilities"], "correctAnswer": 1},
        {"question": "Design of Experiments (DOE) in quality management helps to:", "options": ["Schedule project activities", "Identify which factors affect quality outcomes through systematic testing", "Allocate the project budget", "Develop the risk register"], "correctAnswer": 1},
        {"question": "Process flowcharting in quality management shows:", "options": ["The project budget breakdown", "The sequence of steps in a process to identify where quality issues may occur", "Stakeholder relationships", "Team organizational structure"], "correctAnswer": 1},
        {"question": "A verified deliverable results from:", "options": ["Stakeholder approval", "Quality control activities confirming the deliverable meets specified standards", "Executive sign-off", "Budget approval"], "correctAnswer": 1},
        {"question": "Which of the following is NOT a purpose of quality control?", "options": ["Identifying defects", "Developing quality standards for the first time", "Verifying deliverables meet acceptance criteria", "Recommending corrective actions"], "correctAnswer": 1},
        {"question": "Lean quality principles focus on:", "options": ["Adding features to increase value", "Eliminating waste and continuously improving value delivery", "Strict inspection of all outputs", "Maximizing resource usage"], "correctAnswer": 1},
        {"question": "A control chart's upper and lower control limits define:", "options": ["The project budget boundaries", "The range within which a process is considered in control (statistical limits)", "The range within which a process is considered out of control"], "correctAnswer": 1},
        {"question": "Peer reviews or walkthroughs in quality management are used to:", "options": ["Replace formal testing", "Examine work products collaboratively to identify defects early", "Approve the project charter", "Close the project"], "correctAnswer": 1},
        {"question": "Which quality concept focuses on 'zero defects'?", "options": ["Total Quality Management (TQM)", "Philip Crosby's quality philosophy", "Lean manufacturing", "Statistical Process Control (SPC)"], "correctAnswer": 1},
        {"question": "Customer satisfaction in quality management requires:", "options": ["Exceeding budget", "Understanding and meeting customer needs and expectations consistently", "Producing the maximum number of features", "Minimizing testing time"], "correctAnswer": 1},
        {"question": "Process improvement through quality management benefits the project by:", "options": ["Increasing project costs", "Reducing waste, rework, and defects, leading to better outcomes", "Adding unnecessary documentation", "Delaying project delivery"], "correctAnswer": 1},
        {"question": "Which metric is commonly used to measure quality performance?", "options": ["Budget Variance", "Defect density (defects per unit of output)", "Schedule Variance", "CPI"], "correctAnswer": 1},
        {"question": "Testing in quality control is used to:", "options": ["Identify project stakeholders", "Verify that a product meets specified requirements before delivery", "Approve procurement contracts", "Develop the project schedule"], "correctAnswer": 1},
        {"question": "Root cause analysis aims to: ", "options": ["Assign blame for quality failures", "Identify the underlying reason for a defect to prevent recurrence", "Document all project risks", "Approve project changes"], "correctAnswer": 1},
        {"question": "A project quality metric is:", "options": ["A project milestone", "A measurable standard used to assess whether quality objectives are being achieved", "A risk category", "A procurement criterion"], "correctAnswer": 1},
        {"question": "Mutual trust in a quality-focused team leads to:", "options": ["Reduced accountability", "Open reporting of issues, faster problem resolution, and continuous improvement", "Ignoring quality failures", "Reduced documentation"], "correctAnswer": 1},
        {"question": "Which statement about quality in agile projects is most accurate?", "options": ["Quality is checked only at the end of the project", "Quality is built in continuously through testing, reviews, and retrospectives", "Quality standards are lower in agile", "Quality is managed only by the QA team"], "correctAnswer": 1}
      ],
      "reading": `### Module 7 Final Exam

**📘 AI Structured Reading**
- **Purpose:** This 50-question exam covers the Quality Performance Domain, Standards, Tools (S-7), and continuous improvement cultures.
- **Goal:** Synthesize your understanding of quality planning, management, and control.

**🌍 Practical Tips**
- Focus on prevention over inspection.
- Understand the 7 basic quality tools and their specific uses.
- Master the difference between Quality and Grade, and accuracy vs precision.

**🏅 Badge: Quality Overlord**`
    }
  ],
  8: [
    {
      "id": "8.1",
      "title": "Systems Thinking in Projects",
      "type": "video",
      "youtubeId": "n2blzmxvvcA",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "What is the core idea of 'Systems Thinking' in PMBOK 7?",
          "options": ["Breaking projects into isolated tasks", "Understanding how project components interact as a whole", "Focusing only on the budget", "Ignoring external influences"],
          "correctAnswer": 1,
          "explanation": "Systems thinking involves recognizing, evaluating, and responding to the dynamic and interconnected nature of the project."
        },
        {
          "question": "Which of these is a 'Feedback Loop' in a project system?",
          "options": ["A one-way memo", "The project charter", "A change control process where output modifies future input", "The final project archive"],
          "correctAnswer": 2
        }
      ],
      "reading": `### Subject 1: Holistic Management
      
**📘 AI Structured Reading**
- **Definition:** Systems thinking recognizes that a project is a set of integrated components aiming for a collective goal.
- **Holistic View:** Moving from 'siloed' management to understanding the interdependencies between domains.
- **PMBOK 7 Focus:** The project exists within a larger system (the organization and the environment).

**🌍 Real-World Case**
- **Scenario:** A change in the 'Quality' domain (stricter testing) impacts the 'Schedule' loop.
- **Action:** Identifying that the delay in schedule reduces 'Stakeholder' satisfaction.
- **Outcome:** Adjusting the 'Resource' domain early to balance the system.

**🏅 Badge: Systems Architect**`
    },
    {
      "id": "8.2",
      "title": "Managing Interdependencies",
      "type": "video",
      "youtubeId": "qb5eZWkpFVo",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "Configuration Management is primarily concerned with:",
          "options": ["Staff hiring", "Managing changes to physical or functional characteristics", "Calculating ROI", "Defining the project name"],
          "correctAnswer": 1,
          "explanation": "Configuration management ensures that the functional and physical characteristics of the product are maintained and controlled."
        },
        {
          "question": "Interface Management addresses:",
          "options": ["Only the user UI", "The interactions and connections between project components or stakeholders", "The internal team lunch schedule", "Vendor price negotiation only"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 2: Integrating the Parts
      
**📘 AI Structured Reading**
- **Change Control:** A systemic process to evaluate and integrate changes without breaking the project flow.
- **Configuration Management:** Tracking versions and characteristics of the project's deliverables.
- **Interface Management:** Ensuring smooth 'hand-offs' between different subsystems or teams.

**🌍 Real-World Case**
- **Scenario:** Integrating a legacy API with a new cloud platform.
- **System Challenge:** A mismatch in data frequency caused a feedback loop error.
- **Action:** Applied Interface Management to redefine the data contract between subsystems.

**🏅 Badge: Integration Master**`
    },
    {
      "id": "8.3",
      "title": "Holistic Project Health",
      "type": "interaction",
      "duration": "25 min",
      "completed": false,
      "reading": `### Subject 3: Mastering System Dynamics
      
**📘 AI Structured Reading**
- **System Dynamics:** Understanding how small changes amplify across the project lifecycle.
- **Balancing Constraints:** Explicitly managing the trade-offs between scope, time, cost, quality, and risk.
- **Knowledge Integration:** Weaving technical, business, and leadership knowledge into a single delivery stream.

**📝 Quick Preparation**
1. Why is Change Control a 'Systemic' activity?
2. Define Interface Management.
3. How do you identify a 'Vicious Cycle' in project performance?

**🏅 Badge: Holistic Delivery Lead**`
    },
    {
      "id": "8.4",
      "title": "Module 8: Comprehensive Assessment",
      "type": "interaction",
      "duration": "2h 00m",
      "completed": false,
      "questions": [
        {"question": "Project integration management ensures:", "options": ["All vendors are selected correctly", "All project processes and components are properly coordinated", "Only technical work is completed", "Budgets are minimized"], "correctAnswer": 1},
        {"question": "Systems thinking in project management focuses on:", "options": ["Managing individual tasks in isolation", "Understanding how project components interact and affect the whole system", "Reducing team communication", "Eliminating stakeholder input"], "correctAnswer": 1},
        {"question": "The Develop Project Charter process is part of which Knowledge Area?", "options": ["Scope Management", "Integration Management", "Risk Management", "Schedule Management"], "correctAnswer": 1},
        {"question": "Which process integrates all planning outputs into a coherent document?", "options": ["Identify Stakeholders", "Develop Project Management Plan", "Estimate Costs", "Plan Quality Management"], "correctAnswer": 1},
        {"question": "Integrated Change Control involves:", "options": ["Accepting all change requests automatically", "Reviewing, evaluating, and approving or rejecting changes in a coordinated way", "Ignoring minor changes", "Implementing changes without review"], "correctAnswer": 1},
        {"question": "A configuration management system is used to:", "options": ["Track project budgets", "Control versions of project documents and products", "Manage stakeholder communication", "Schedule team meetings"], "correctAnswer": 1},
        {"question": "Which of the following is a key output of Close Project or Phase?", "options": ["Project Charter", "Final product, service, or result transition and lessons learned register", "Risk Register", "Procurement Plan"], "correctAnswer": 1},
        {"question": "A project management information system (PMIS) supports integration by:", "options": ["Replacing the project manager", "Providing tools to collect, integrate, and communicate project information", "Developing the WBS", "Managing vendor contracts"], "correctAnswer": 1},
        {"question": "Which of the following describes 'feedback loops' in systems thinking?", "options": ["Repeated stakeholder meetings", "Circular cause-and-effect relationships where outputs become inputs", "Budget approval cycles", "Communication planning cycles"], "correctAnswer": 1},
        {"question": "The 'whole is greater than the sum of its parts' principle relates to:", "options": ["Risk management", "Systems thinking — emergent behavior arising from component interactions", "Schedule compression", "Quality management"], "correctAnswer": 1},
        {"question": "Close Project or Phase ensures:", "options": ["The project team is kept on the project indefinitely", "All activities are formally completed, lessons learned are captured, and resources are released", "New projects are initiated immediately", "Risk register is archived without review"], "correctAnswer": 1},
        {"question": "Which document formally authorizes the project and integrates stakeholder expectations?", "options": ["Scope statement", "Project Charter", "Budget plan", "Risk register"], "correctAnswer": 1},
        {"question": "Which of the following best describes 'complexity' in project management?", "options": ["A project with many activities", "A state characterized by many interacting elements with unpredictable outcomes", "A project with a large budget", "A project lasting more than one year"], "correctAnswer": 1},
        {"question": "Systems thinking helps project managers to:", "options": ["Focus only on individual work packages", "Understand interdependencies and anticipate unintended consequences of decisions", "Avoid stakeholder engagement", "Reduce team size"], "correctAnswer": 1},
        {"question": "A project's integration management includes:", "options": ["Only financial reporting", "Coordinating knowledge areas and processes to achieve project objectives", "Managing only procurement contracts", "Defining individual team tasks"], "correctAnswer": 1},
        {"question": "Which process monitors and controls the entire project work?", "options": ["Develop Project Charter", "Monitor and Control Project Work", "Plan Risk Management", "Identify Stakeholders"], "correctAnswer": 1},
        {"question": "Knowledge management in project integration involves:", "options": ["Deleting project records", "Sharing and using knowledge across the organization to improve project performance", "Restricting information flow", "Purchasing external knowledge systems"], "correctAnswer": 1},
        {"question": "An integrated project plan requires all subsidiary plans to be:", "options": ["Created independently without coordination", "Consistent and aligned with each other", "Developed by different teams without review", "Approved by external auditors"], "correctAnswer": 1},
        {"question": "Which of the following characterizes a 'wicked problem' in systems thinking?", "options": ["A simple, well-defined problem with a clear solution", "A complex, ill-defined problem where solving one aspect creates new challenges", "A technical defect in the project", "A risk with high probability"], "correctAnswer": 1},
        {"question": "Integration of agile and predictive approaches is called:", "options": ["Scrum", "Hybrid project management", "Waterfall plus", "Adaptive control"], "correctAnswer": 1},
        {"question": "Benefits management plan is associated with:", "options": ["Procurement planning", "Ensuring the project delivers the intended business value and benefits over time", "Schedule compression", "Quality inspection"], "correctAnswer": 1},
        {"question": "The term 'interdependency' in systems thinking means:", "options": ["Each project task is completely independent", "Components of the project affect and are affected by each other", "Only external stakeholders affect the project", "The project manager controls all variables"], "correctAnswer": 1},
        {"question": "Lessons learned in project integration are valuable because they:", "options": ["Replace the need for risk management", "Inform future projects and help organizations improve over time", "Are only useful for documenting failures", "Eliminate the need for quality management"], "correctAnswer": 1},
        {"question": "Which of the following is a key purpose of project closure?", "options": ["Begin a new project phase", "Formally complete the project, document lessons learned, and release resources", "Identify project risks", "Develop the project charter"], "correctAnswer": 1},
        {"question": "Adaptive approaches in project management respond to:", "options": ["Fixed, well-understood requirements", "High levels of change and uncertainty by adjusting plans iteratively", "Low complexity environments", "Projects with no stakeholder involvement"], "correctAnswer": 1},
        {"question": "Cause-and-effect thinking in project management helps to:", "options": ["Avoid stakeholder communication", "Understand how actions and decisions create downstream project outcomes", "Define the WBS structure", "Develop procurement contracts"], "correctAnswer": 1},
        {"question": "Which is an example of emergent behavior in a complex project?", "options": ["A planned deliverable completed on time", "Unexpected outcomes arising from team interactions not predictable by individual actions", "A scheduled risk response being implemented", "A budget variance identified in reporting"], "correctAnswer": 1},
        {"question": "A project's 'context' in systems thinking refers to:", "options": ["The project budget only", "The environment, constraints, and external factors surrounding the project", "The project team's skills", "The project schedule"], "correctAnswer": 1},
        {"question": "Change management integration ensures:", "options": ["All changes are rejected", "Changes are evaluated, approved, and reflected consistently across the project plan", "Changes are implemented without documentation", "Changes are delegated only to team members"], "correctAnswer": 1},
        {"question": "Which tool supports integrated project control by showing all key performance metrics?", "options": ["WBS", "Integrated project dashboard", "Risk matrix", "RACI chart"], "correctAnswer": 1},
        {"question": "Systems thinking requires project managers to:", "options": ["Focus exclusively on technical deliverables", "See the project as a whole, with interconnected parts affecting each other", "Avoid organizational politics", "Simplify all project complexities"], "correctAnswer": 1},
        {"question": "Which knowledge area underpins all other PMBOK knowledge areas?", "options": ["Risk Management", "Integration Management", "Scope Management", "Quality Management"], "correctAnswer": 1},
        {"question": "Project governance in integration management defines:", "options": ["Individual task assignments", "Decision-making frameworks, accountability, and oversight for the project", "Budget allocation methods", "Quality metrics"], "correctAnswer": 1},
        {"question": "A 'system boundary' in systems thinking defines:", "options": ["The project's budget limit", "The scope of what is included and excluded from the system being analyzed", "The project team's reporting structure", "The risk appetite"], "correctAnswer": 1},
        {"question": "Managing project trade-offs (scope/cost/schedule) is a key integration activity because:", "options": ["These constraints are independent of each other", "Changes to one constraint typically affect the others and must be balanced", "Trade-offs only affect the project manager", "Trade-offs are resolved automatically"], "correctAnswer": 1},
        {"question": "Which of the following represents integration in a predictive project?", "options": ["Conducting daily standups", "Maintaining a comprehensive, approved Project Management Plan that integrates all components", "Using sprint backlogs", "Self-organizing teams"], "correctAnswer": 1},
        {"question": "Organizational learning is supported by project integration through:", "options": ["Deleting project records after closure", "Capturing and sharing knowledge, lessons learned, and best practices", "Avoiding stakeholder feedback", "Minimizing documentation"], "correctAnswer": 1},
        {"question": "Which process in integration management handles day-to-day project decisions?", "options": ["Close Project or Phase", "Direct and Manage Project Work", "Develop Project Charter", "Identify Stakeholders"], "correctAnswer": 1},
        {"question": "A holistic view in project management means:", "options": ["Managing each task in complete isolation", "Considering all aspects of the project together rather than in silos", "Focusing only on the critical path", "Limiting stakeholder involvement"], "correctAnswer": 1},
        {"question": "Why is integration management called the 'glue' of project management?", "options": ["It reduces project costs", "It binds together all other knowledge areas and processes to deliver project objectives", "It manages only contractual obligations", "It is the least important knowledge area"], "correctAnswer": 1},
        {"question": "Which of the following is a key principle of systems thinking in complex projects?", "options": ["Breaking problems into parts and solving each in isolation", "Recognizing that the project environment is dynamic and components are interrelated", "Avoiding change at all costs", "Delegating all decisions to team leads"], "correctAnswer": 1},
        {"question": "Performance reviews in project integration compare:", "options": ["Team members against each other", "Actual project performance against the integrated project plan baselines", "Vendor prices against market rates", "Risk register updates against initial risks"], "correctAnswer": 1},
        {"question": "Escalation paths in integration management ensure:", "options": ["All issues are resolved by the project manager only", "Issues beyond the project manager's authority are raised to the appropriate decision-making level", "Conflicts are ignored until project closure", "All team decisions are approved by the sponsor"], "correctAnswer": 1},
        {"question": "The iron triangle (triple constraint) in integration refers to:", "options": ["Budget, risk, and quality", "Scope, schedule, and cost — the three primary constraints that must be balanced", "Communication, risk, and procurement", "People, process, and technology"], "correctAnswer": 1},
        {"question": "A project phase gate review in integration management is used to: ", "options": ["Automatically approve the next phase", "Assess whether the project should proceed to the next phase based on performance and value", "Close the project immediately", "Replace the project charter"], "correctAnswer": 1},
        {"question": "Transition management at project closure ensures:", "options": ["The team continues indefinitely", "The project deliverable is formally handed over to operations or the customer", "All risks are transferred to vendors", "Budget is reallocated to new projects"], "correctAnswer": 1},
        {"question": "Complexity in project management can arise from:", "options": ["Small team size", "Stakeholder diversity, technical uncertainty, organizational dynamics, and external factors", "Well-defined requirements", "Predictable environments"], "correctAnswer": 1},
        {"question": "Which of the following best supports integrated decision-making?", "options": ["Silo-based thinking", "Collaborative decision-making informed by data across all project knowledge areas", "Individual team member decisions", "Vendor-driven decisions"], "correctAnswer": 1},
        {"question": "Which output of Develop Project Management Plan is most critical for integration?", "options": ["Risk register", "The integrated, approved Project Management Plan with all subsidiary plans", "Stakeholder register", "Procurement plan"], "correctAnswer": 1}
      ],
      "reading": `### Module 8 Final Exam
      
**📘 AI Structured Reading**
- **Purpose:** This 49-question exam covers the Integration Performance Domain, Systems Thinking, and Holistic Project Health.
- **Goal:** Demonstrate your ability to unify the project's components into a high-functioning system.

**🌍 Practical Tips**
- Understand how domains influence each other (e.g., how quality impacts schedule).
- Focus on the 'System Architect' role—seeing the project from 30,000 feet while managing the details.
- Master the Integrated Change Control process as the 'control center' of the project.

**🏅 Badge: System Harmonizer**`
    }
  ],
  9: [
    {
      "id": "9.1",
      "title": "Optimizing Workflow & Flow",
      "type": "video",
      "youtubeId": "SJcHiiNpUds",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "What is 'Flow' in the context of project delivery?",
          "options": ["The speed of the Project Manager's car", "The continuous movement of work through the system", "A type of waterfall model", "The total number of tasks in the backlog"],
          "correctAnswer": 1,
          "explanation": "Flow is the smooth, continuous movement of value through the project lifecycle."
        },
        {
          "question": "Value Stream Mapping is used to:",
          "options": ["Identify waste and optimize the flow of work", "Calculate the ROI of a project", "Assign office seating", "Draft a legal contract"],
          "correctAnswer": 0
        }
      ],
      "reading": `### Subject 1: The Lean Delivery Engine
      
**📘 AI Structured Reading**
- **Definition:** Flow efficiency measures how much time a work item spends in a 'value-adding' state vs 'waiting' state.
- **Value Stream Mapping:** Visualizing the end-to-end process to eliminate bottlenecks.
- **PMBOK 7 Focus:** Delivery cadence should be optimized to provide a steady rhythm of value.

**🌍 Real-World Case**
- **Scenario:** A software team with a 3-week 'Testing' bottleneck.
- **Action:** Applied Value Stream Mapping and implemented automated testing gates.
- **Outcome:** Reduced 'Lead Time' from 6 weeks to 10 days while increasing quality.

**🏅 Badge: Flow Optimizer**`
    },
    {
      "id": "9.2",
      "title": "Critical Path & Schedule Compression",
      "type": "video",
      "youtubeId": "uTBGw56ztJ8",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "What is 'Fast Tracking'?",
          "options": ["Adding more resources to a task", "Performing tasks in parallel that were originally planned in sequence", "Reducing the quality of the product", "Extending the project deadline"],
          "correctAnswer": 1,
          "explanation": "Fast tracking is a schedule compression technique where activities are performed in parallel for at least a portion of their duration."
        },
        {
          "question": "Crashing a schedule involves:",
          "options": ["Increasing project risk purposely", "Adding resources to shorten the activity duration for the least incremental cost", "Canceling the project", "Removing all scope"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 2: Mastering the Timeline
      
**📘 AI Structured Reading**
- **Critical Path Management:** Focusing on the sequence of activities that determines the shortest project duration.
- **Schedule Compression:** Fast Tracking (Parallelism) vs. Crashing (Adding Resources).
- **Critical Chain:** Managing the project by protecting 'buffers' rather than individual task dates.

**🌍 Real-World Case**
- **Scenario:** A product launch delayed by 2 months.
- **Strategy:** Applied 'Crashing' to the critical path design phase by adding senior consultants.
- **Outcome:** Recovered 6 weeks of schedule with a 15% increase in phase cost.

**🏅 Badge: Timeline Strategist**`
    },
    {
      "id": "9.3",
      "title": "Lean Metrics & WIP Limits",
      "type": "interaction",
      "duration": "25 min",
      "completed": false,
      "reading": `### Subject 3: Metrics of Efficiency
      
**📘 AI Structured Reading**
- **Cycle Time vs Lead Time:** Cycle time is work start-to-finish; Lead time is request-to-delivery.
- **WIP Limits:** Restricting Work-In-Progress to prevent system overloading and multitasking waste.
- **Throughput:** The number of items completed in a specific time period.

**📝 Quick Preparation**
1. How does reducing WIP improve Cycle Time?
2. Difference between Fast Tracking and Crashing?
3. Importance of the Critical Path?

**🏅 Badge: Efficiency Conductor**`
    },
    {
      "id": "9.4",
      "title": "Module 9: Comprehensive Assessment",
      "type": "interaction",
      "duration": "2h 00m",
      "completed": false,
      "questions": [
        {"question": "Schedule management in projects is primarily concerned with:", "options": ["Managing project costs", "Defining, sequencing, estimating, and controlling project activities over time", "Managing team performance", "Identifying stakeholder requirements"], "correctAnswer": 1},
        {"question": "The Critical Path Method (CPM) identifies:", "options": ["The most expensive sequence of tasks", "The longest path of dependent activities that determines the minimum project duration", "The shortest path through the network", "The path with the most resources"], "correctAnswer": 1},
        {"question": "Lag in project scheduling means:", "options": ["An activity is completed early", "A waiting period between the end of one activity and the start of the next", "An overlap between two activities", "A reduction in activity duration"], "correctAnswer": 1},
        {"question": "Lead in project scheduling means:", "options": ["The first activity in the project", "An overlap where a successor activity starts before its predecessor is fully complete", "A delay between activities", "The project manager's authority"], "correctAnswer": 1},
        {"question": "The Theory of Constraints (TOC) focuses on:", "options": ["Eliminating all project risks", "Identifying and managing the bottleneck that limits overall project flow", "Reducing the project budget", "Managing stakeholder expectations"], "correctAnswer": 1},
        {"question": "Critical Chain Project Management (CCPM) differs from CPM by:", "options": ["Using the same methods as CPM", "Accounting for resource constraints and adding project buffers to protect the schedule", "Ignoring resource availability", "Eliminating all schedule float"], "correctAnswer": 1},
        {"question": "Flow efficiency in project management means:", "options": ["Maximizing resource utilization rates", "Minimizing the time from starting to completing work, reducing delays and waste", "Completing the most tasks per day", "Using the most resources possible"], "correctAnswer": 1},
        {"question": "A Kanban board in agile and lean environments is used to:", "options": ["Track financial budgets", "Visualize work in progress (WIP) and manage flow of tasks", "Develop the WBS", "Identify project risks"], "correctAnswer": 1},
        {"question": "Work-in-progress (WIP) limits in Kanban help to:", "options": ["Increase multitasking", "Prevent bottlenecks by restricting the number of tasks in each workflow stage", "Reduce team size", "Minimize stakeholder communication"], "correctAnswer": 1},
        {"question": "Fast-tracking a project schedule involves:", "options": ["Adding more resources to critical activities", "Performing sequential activities in parallel to shorten the schedule", "Removing low-priority tasks", "Increasing quality standards"], "correctAnswer": 1},
        {"question": "Schedule crashing involves:", "options": ["Performing activities in parallel", "Adding resources to critical path activities to reduce duration, usually increasing cost", "Removing activities from the project", "Extending the project deadline"], "correctAnswer": 1},
        {"question": "Total float in a schedule is:", "options": ["The time an activity can be delayed without delaying a successor", "The time an activity can be delayed without delaying the project end date", "The resource buffer in a schedule", "The schedule reserve added by the PM"], "correctAnswer": 1},
        {"question": "Free float for an activity is:", "options": ["The total float of the critical path", "The amount of time an activity can be delayed without delaying the early start of its successor", "The management reserve in scheduling", "The schedule baseline buffer"], "correctAnswer": 1},
        {"question": "Which Lean concept aims to reduce time waste in project delivery?", "options": ["Gold plating", "Value stream mapping — identifying and eliminating non-value-adding steps", "Scope creep management", "Critical path compression"], "correctAnswer": 1},
        {"question": "A project buffer in Critical Chain is placed:", "options": ["At the beginning of the project", "At the end of the critical chain to protect the project completion date", "Before each milestone", "Within each individual activity"], "correctAnswer": 1},
        {"question": "Cycle time in project management refers to:", "options": ["The length of a project sprint", "The total time from starting to completing a unit of work", "The number of iterations in agile", "The project's total duration"], "correctAnswer": 1},
        {"question": "Throughput in project management means:", "options": ["Budget spent per month", "The rate at which the project delivers completed work or value", "Number of team members working at once", "Volume of documentation produced"], "correctAnswer": 1},
        {"question": "Which scheduling technique uses probability distributions to account for uncertainty?", "options": ["Critical Path Method (CPM)", "Program Evaluation and Review Technique (PERT)", "Kanban", "Agile sprint planning"], "correctAnswer": 1},
        {"question": "A milestone chart is different from a Gantt chart because:", "options": ["It shows resource usage", "It shows only key events or completion points without showing activity durations", "It shows budget trends", "It shows team assignments"], "correctAnswer": 1},
        {"question": "Schedule compression techniques include:", "options": ["Scope reduction and risk acceptance", "Fast-tracking and crashing", "Resource leveling and smoothing", "Activity decomposition and sequencing"], "correctAnswer": 1},
        {"question": "Negative float on a project schedule indicates:", "options": ["The project is ahead of schedule", "The project is behind schedule and the deadline cannot be met without corrective action", "Extra time available in the schedule", "Resource over-allocation"], "correctAnswer": 1},
        {"question": "Finish-to-Start (FS) dependency means:", "options": ["Activities can overlap freely", "A successor activity cannot start until the predecessor has finished", "The successor must finish before the predecessor starts", "Both activities start at the same time"], "correctAnswer": 1},
        {"question": "Start-to-Start (SS) dependency means:", "options": ["The successor cannot start until the predecessor finishes", "The successor cannot start until the predecessor starts", "Both activities must finish together", "Activities are completely independent"], "correctAnswer": 1},
        {"question": "Which of the following is a technique to identify critical path activities?", "options": ["Probability-impact matrix", "Forward and backward pass through the network diagram", "Risk register review", "RACI chart analysis"], "correctAnswer": 1},
        {"question": "Resource-constrained scheduling considers:", "options": ["Activities without resource limitations", "The availability of resources when developing the schedule", "Only cost constraints", "Only scope constraints"], "correctAnswer": 1},
        {"question": "A sprint in agile project management is:", "options": ["A long project phase lasting 6 months", "A short, fixed-length iteration (typically 1-4 weeks) to deliver working output", "A schedule compression technique", "A resource management method"], "correctAnswer": 1},
        {"question": "Velocity in agile projects measures:", "options": ["The speed of project team members", "The amount of work completed per sprint, used to forecast future delivery", "The number of meetings held per sprint", "The budget consumed per sprint"], "correctAnswer": 1},
        {"question": "Which scheduling technique works best for highly uncertain projects?", "options": ["Critical Path Method (CPM)", "Agile/rolling wave planning with iterative scheduling", "Bar charts only", "Fixed baseline scheduling"], "correctAnswer": 1},
        {"question": "Time-boxing in project management means:", "options": ["Adding time buffers to every activity", "Fixing the duration of an activity or phase, adjusting scope to fit within the time limit", "Extending deadlines whenever needed", "Tracking elapsed time only"], "correctAnswer": 1},
        {"question": "Bottleneck management in project flow focuses on:", "options": ["Increasing resource utilization across all activities", "Identifying and alleviating the constraint limiting overall project throughput", "Adding more tasks to the schedule", "Eliminating all project risks"], "correctAnswer": 1},
        {"question": "The Schedule Performance Index (SPI) of 1.15 means:", "options": ["The project is 15% over budget", "The project is 15% ahead of the planned schedule", "The project is 15% behind schedule", "The project has 15% more resources than planned"], "correctAnswer": 1},
        {"question": "Value stream mapping in Lean identifies:", "options": ["Financial value delivered", "All process steps and how value flows (or is delayed) through the project", "Stakeholder value expectations", "Budget variance causes"], "correctAnswer": 1},
        {"question": "Which of the following is a pull-based scheduling approach?", "options": ["Gantt chart scheduling", "Kanban — work is pulled when capacity is available, not pushed by a fixed plan", "Critical Path Method", "Earned Value Management"], "correctAnswer": 1},
        {"question": "Activity-on-Node (AON) network diagrams represent:", "options": ["Activities on arrows between nodes", "Activities as boxes/nodes with arrows showing dependencies", "Resources on a timeline", "Budget allocations per activity"], "correctAnswer": 1},
        {"question": "Monte Carlo simulation in scheduling is used to:", "options": ["Develop the WBS", "Model schedule uncertainty and produce a range of possible completion dates", "Identify project stakeholders", "Develop risk responses"], "correctAnswer": 1},
        {"question": "Which technique identifies activities that can be delayed without impacting the project end date?", "options": ["Critical Chain Method", "Float analysis from the Critical Path Method", "Earned Value Management", "Resource histogram analysis"], "correctAnswer": 1},
        {"question": "Drum-Buffer-Rope (DBR) in the Theory of Constraints refers to:", "options": ["A musical framework", "The bottleneck (drum), buffer protecting the bottleneck, and rope synchronizing work release", "Three project management documents", "Three schedule baselines"], "correctAnswer": 1},
        {"question": "The purpose of a project timeline baseline is to:", "options": ["Automatically approve changes", "Provide a reference for measuring schedule performance and managing deviations", "Assign team roles", "Define quality standards"], "correctAnswer": 1},
        {"question": "Which practice helps prevent multi-tasking waste in Lean project delivery?", "options": ["Increasing WIP limits", "WIP limits that restrict how many tasks can be in progress simultaneously", "Adding more team members", "Developing detailed Gantt charts"], "correctAnswer": 1},
        {"question": "A dependency between projects (external dependency) means:", "options": ["The activity depends only on internal team members", "The timing of an activity depends on an output or event from outside the project", "All activities are independent", "The project can proceed without external inputs"], "correctAnswer": 1},
        {"question": "Schedule contingency reserve is:", "options": ["Float on the critical path", "Extra time added to the schedule to account for identified schedule risks", "The total float of all activities", "Time reserved for scope changes"], "correctAnswer": 1},
        {"question": "Which of the following best defines 'lead time' in a Lean context?", "options": ["The time from project initiation to completion", "The total elapsed time from when a request is made to when it is fulfilled", "The time to complete a single sprint", "The time between stakeholder meetings"], "correctAnswer": 1},
        {"question": "Which technique reduces schedule duration without increasing cost?", "options": ["Crashing", "Fast-tracking (doing tasks in parallel where possible)", "Adding resources", "Extending working hours"], "correctAnswer": 1},
        {"question": "What does a network diagram help the project manager to determine?", "options": ["Team performance levels", "Activity sequences, dependencies, and the critical path", "Budget variance", "Stakeholder communication preferences"], "correctAnswer": 1},
        {"question": "Earned Schedule (ES) compared to Earned Value (EV) provides:", "options": ["A cost-based performance measure", "A time-based measure of schedule performance expressed in calendar time", "A quality-based measure", "A resource utilization measure"], "correctAnswer": 1},
        {"question": "Which metric measures whether a project's pace of completion aligns with the schedule?", "options": ["CPI", "Schedule Performance Index (SPI)", "VAC", "EAC"], "correctAnswer": 1},
        {"question": "A well-managed project timeline reduces:", "options": ["Stakeholder count", "Schedule overruns, cost overruns, and poor quality due to rushed work", "Team size", "Number of project deliverables"], "correctAnswer": 1},
        {"question": "Which Agile ceremony is used to improve team flow efficiency each sprint?", "options": ["Sprint planning", "Sprint retrospective", "Daily standup", "Sprint review"], "correctAnswer": 1},
        {"question": "A resource-constrained critical path differs from the standard critical path because:", "options": ["It ignores dependencies", "It accounts for resource availability limitations that may extend the schedule", "It always results in a shorter duration", "It removes all float from the schedule"], "correctAnswer": 1},
        {"question": "Schedule performance reporting helps stakeholders by:", "options": ["Approving project scope changes", "Providing visibility into schedule status, trends, and forecast completion dates", "Identifying new risks", "Closing procurement contracts"], "correctAnswer": 1}
      ],
      "reading": `### Module 9 Final Exam
      
**📘 AI Structured Reading**
- **Purpose:** This 50-question exam covers the Schedule Performance Domain, Critical Path Method, and Lean Flow Efficiency.
- **Goal:** Master the art of managing time and delivery velocity in complex projects.

**🌍 Practical Tips**
- Understand the difference between lead and lag.
- Focus on flow efficiency (value-adding time vs. waiting time).
- Know your schedule compression techniques and their trade-offs.

**🏅 Badge: Temporal Architect**`
    }
  ],
  10: [
    {
      "id": "10.1",
      "title": "Change Control & Impact Analysis",
      "type": "video",
      "youtubeId": "c-YGefS64ss",
      "duration": "45 min",
      "completed": false,
      "questions": [
        {
          "question": "What is the primary role of a Change Control Board (CCB)?",
          "options": ["To write the change requests", "To review, evaluate, and approve or reject changes", "To implement the changes technically", "To pay for change costs"],
          "correctAnswer": 1,
          "explanation": "The CCB is a formal group responsible for reviewing and making decisions on changes to project baselines."
        },
        {
          "question": "What does 'Impact Analysis' evaluate?",
          "options": ["Only the cost of a change", "The effect of a change on scope, schedule, cost, and quality", "What the customer wants for lunch", "The speed of the project team"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 1: Governing the Evolution
      
**📘 AI Structured Reading**
- **Change Request:** A formal proposal to modify any document, deliverable, or baseline.
- **CCB Process:** Evaluating the 'systemic' impact of a change before approval.
- **Impact Analysis:** Rigorously assessing how a change rippling through the project domains.

**🌍 Real-World Case**
- **Scenario:** A client requests an 'urgent' feature addition mid-sprint.
- **Action:** Performed an impact analysis showing a 2-week delay on the critical path.
- **Outcome:** CCB approved the change but increased the budget and extended the deadline accordingly.

**🏅 Badge: Change Governor**`
    },
    {
      "id": "10.2",
      "title": "Agile Pivoting & Adaptability",
      "type": "video",
      "youtubeId": "tiCQqAYOw38",
      "duration": "40 min",
      "completed": false,
      "questions": [
        {
          "question": "What is an 'Agile Pivot'?",
          "options": ["Closing the project completely", "A fundamental shift in strategy based on feedback while maintaining the vision", "Changing the team leader every week", "Ignoring all previous work"],
          "correctAnswer": 1
        },
        {
          "question": "Adaptability in PMBOK 7 refers to:",
          "options": ["The ability to follow an original plan perfectly", "The capacity to respond to changing conditions", "Having an unlimited budget", "Using only waterfall methods"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 2: The Art of the Pivot
      
**📘 AI Structured Reading**
- **Adaptability:** The capacity to absorb changes and maintain performance.
- **Pivoting:** Adjusting the project approach or product direction based on emerging information.
- **Agile Change:** Integrating change as a standard part of the iterative refinement process.

**🌍 Real-World Case**
- **Scenario:** Market research shows a shift in user preference toward mobile-first interfaces.
- **Action:** The team 'Pivoted' the development roadmap to prioritize the mobile app over the web portal.
- **Outcome:** Captured 30% more market share than originally projected.

**🏅 Badge: Adaptability Ninja**`
    },
    {
      "id": "10.3",
      "title": "Organizational Change Management",
      "type": "video",
      "youtubeId": "gRsEr4nUx10",
      "duration": "35 min",
      "completed": false,
      "reading": `### Subject 3: Driving Institutional Commitment
      
**📘 AI Structured Reading**
- **OCM:** Ensuring the people within the organization transition successfully to the project's outcomes.
- **Change Saturation:** Recognizing when an organization cannot handle more simultaneous changes.
- **Stakeholder Alignment:** Maintaining trust and commitment through clear communication of the 'Why'.

**📝 Quick Preparation**
1. How does a Change Log differ from a Change Report?
2. What is the impact of 'Change Saturation' on team performance?
3. Importance of a formal CCB in predictive projects?

**🏅 Badge: Transformation Champion**`
    },
    {
      "id": "10.4",
      "title": "Module 10: Comprehensive Assessment",
      "type": "interaction",
      "duration": "2h 30m",
      "completed": false,
      "questions": [
        {"question": "Change management in project management primarily aims to:", "options": ["Prevent all project changes", "Control how changes are proposed, evaluated, approved, and implemented", "Automatically approve all stakeholder requests", "Eliminate the need for a project scope"], "correctAnswer": 1},
        {"question": "A change request in project management can be triggered by:", "options": ["Project charter approval", "Scope variations, stakeholder requests, corrective actions, or external factors", "Project closure", "Budget approval"], "correctAnswer": 1},
        {"question": "Integrated Change Control (ICC) ensures:", "options": ["All changes are rejected to maintain the original plan", "Changes are reviewed and approved considering their impact on all project baselines", "Changes are immediately implemented without review", "The project manager approves all changes unilaterally"], "correctAnswer": 1},
        {"question": "Which of the following describes 'adaptive project management'?", "options": ["Following a fixed plan without deviation", "Embracing and planning for change through iterative cycles and continuous feedback", "Avoiding stakeholder input", "Eliminating risk management"], "correctAnswer": 1},
        {"question": "Agile approaches are most effective when:", "options": ["Requirements are fully known and stable", "Requirements are unclear, evolving, or likely to change throughout the project", "Projects are simple with low uncertainty", "Stakeholder involvement is minimal"], "correctAnswer": 1},
        {"question": "A Change Control Board (CCB) is responsible for:", "options": ["Identifying project risks", "Reviewing, approving, or rejecting change requests", "Managing team performance", "Developing the project schedule"], "correctAnswer": 1},
        {"question": "Resistance to change in organizations is best managed by:", "options": ["Ignoring resistant stakeholders", "Engaging stakeholders early, communicating benefits, and involving them in the change", "Forcing change through authority", "Delaying change indefinitely"], "correctAnswer": 1},
        {"question": "Kotter's 8-Step Change Model begins with:", "options": ["Building a guiding coalition", "Creating urgency — establishing why change is necessary", "Communicating the vision", "Generating short-term wins"], "correctAnswer": 1},
        {"question": "Which agile framework uses sprints and roles such as Scrum Master and Product Owner?", "options": ["Kanban", "Scrum", "SAFe", "PRINCE2 Agile"], "correctAnswer": 1},
        {"question": "A product backlog in agile is:", "options": ["A list of completed project deliverables", "A prioritized list of features and requirements to be developed", "A project risk register", "A team performance report"], "correctAnswer": 1},
        {"question": "Which of the following is a principle of the Agile Manifesto?", "options": ["Following a plan over responding to change", "Welcoming changing requirements, even late in development", "Comprehensive documentation over working software", "Contract negotiation over customer collaboration"], "correctAnswer": 1},
        {"question": "Agile retrospectives are used to:", "options": ["Approve new features for the next sprint", "Reflect on the past sprint to identify improvements in team processes", "Update the project schedule baseline", "Close vendor contracts"], "correctAnswer": 1},
        {"question": "The ADKAR model for change management focuses on:", "options": ["Activity, Deliverable, Knowledge, Analysis, Review", "Awareness, Desire, Knowledge, Ability, and Reinforcement", "Agile, Design, Kanban, Action, Retrospective", "Authority, Direction, Knowledge, Assessment, Reporting"], "correctAnswer": 1},
        {"question": "Which change management approach emphasizes 'unfreezing, changing, and refreezing'?", "options": ["ADKAR model", "Lewin's Change Management Model", "Kotter's 8-Step Model", "McKinsey 7-S Framework"], "correctAnswer": 1},
        {"question": "A 'fail fast' mindset in adaptive project management means:", "options": ["Rushing to complete all deliverables", "Testing ideas quickly, learning from failures early, and adjusting before major investment", "Accepting all project failures without analysis", "Canceling the project at the first sign of difficulty"], "correctAnswer": 1},
        {"question": "Organizational change readiness assessment helps to:", "options": ["Identify project risks", "Gauge the organization's capacity and willingness to adopt change", "Develop the project schedule", "Approve procurement contracts"], "correctAnswer": 1},
        {"question": "Which of the following best describes 'minimum viable product (MVP)' in adaptive projects?", "options": ["The lowest quality product acceptable", "The smallest set of features that delivers value and enables learning and feedback", "The cheapest product option", "The final product version"], "correctAnswer": 1},
        {"question": "Continuous improvement in adaptive project management is best supported by:", "options": ["Following the original plan without deviation", "Regular retrospectives, feedback loops, and iterative adjustments", "Avoiding stakeholder feedback", "Minimizing documentation"], "correctAnswer": 1},
        {"question": "Change impact analysis during a project involves:", "options": ["Implementing the change immediately", "Evaluating how a proposed change affects scope, schedule, cost, quality, and risk", "Rejecting all change requests", "Documenting changes after implementation"], "correctAnswer": 1},
        {"question": "Which of the following is a key challenge in managing change in complex projects?", "options": ["All stakeholders support change equally", "Unpredictable cascading effects due to interdependencies", "Changes are always planned in advance", "Change management is only needed at project initiation"], "correctAnswer": 1},
        {"question": "An emergency change in project management:", "options": ["Follows the normal change control process with no modifications", "May bypass some steps of the formal change process due to urgency, but must be documented post-approval", "Is automatically approved without review", "Is rejected until the next planning cycle"], "correctAnswer": 1},
        {"question": "Which of the following best supports organizational adaptability?", "options": ["Strict adherence to original plans", "Building flexibility into processes, culture, and governance to respond to change", "Limiting stakeholder involvement", "Avoiding iterative reviews"], "correctAnswer": 1},
        {"question": "In an agile project, the product owner is responsible for:", "options": ["Managing team conflicts", "Prioritizing the product backlog to maximize business value", "Developing technical solutions", "Approving the project charter"], "correctAnswer": 1},
        {"question": "A change freeze in project management means:", "options": ["All project activities stop permanently", "A temporary halt to change requests, typically near project completion or key milestones", "All existing changes are rejected", "The project scope is automatically reduced"], "correctAnswer": 1},
        {"question": "Which agile scaling framework coordinates multiple agile teams working on a large program?", "options": ["Scrum", "SAFe (Scaled Agile Framework)", "Kanban", "Lean"], "correctAnswer": 1},
        {"question": "Benefits of a structured change management process include:", "options": ["Eliminating all project changes", "Prevent unauthorized changes, managing expectations, and preserving project baselines", "Automating all project decisions", "Reducing stakeholder communication"], "correctAnswer": 1},
        {"question": "Which concept in change management refers to the psychological journey people go through during change?", "options": ["Cost-benefit analysis", "The Change Curve (Kübler-Ross model adapted for organizations)", "Risk probability matrix", "WBS decomposition"], "correctAnswer": 1},
        {"question": "Iterative development in agile means:", "options": ["Completing all work before testing", "Building and refining the product through repeated cycles of development and feedback", "Using a fixed sequential process", "Avoiding customer involvement during development"], "correctAnswer": 1},
        {"question": "A 'definition of done' in agile ensures:", "options": ["The product is shipped at any quality level", "A shared team understanding of what criteria must be met for work to be considered complete", "Only the product owner decides completion", "Tasks are marked done when started"], "correctAnswer": 1},
        {"question": "Configuration management during change ensures:", "options": ["The team follows agile principles only", "Product and documentation versions are tracked and controlled through changes", "Budget remains unchanged", "Stakeholders are removed from change reviews"], "correctAnswer": 1},
        {"question": "Which is the most important factor for successful change adoption?", "options": ["A detailed Gantt chart", "Strong leadership, clear communication, and active stakeholder engagement", "A large project budget", "Complex technical tools"], "correctAnswer": 1},
        {"question": "In project management, a 'scope change' must:", "options": ["Be implemented immediately without formal review", "Go through the formal change control process for evaluation and approval", "Be rejected automatically", "Be communicated only to the project manager"], "correctAnswer": 1},
        {"question": "Daily standups in Scrum help with change adaptability by:", "options": ["Replacing formal planning sessions", "Providing daily visibility into progress and quickly identifying obstacles to address", "Approving sprint changes", "Documenting lessons learned"], "correctAnswer": 1},
        {"question": "Which of the following best describes an 'increment' in agile?", "options": ["A completed project phase", "A working, potentially shippable piece of product output completed in a sprint", "A budget increment", "A change request"], "correctAnswer": 1},
        {"question": "The role of a change champion in organizational change is:", "options": ["To block changes from occurring", "To advocate for and support the change within the organization", "To approve all budget changes", "To document project risks"], "correctAnswer": 1},
        {"question": "Adaptive project management benefits include:", "options": ["Rigid adherence to original plans", "Faster delivery of value, reduced risk from uncertainty, and improved responsiveness to stakeholders", "Elimination of project documentation", "Avoidance of stakeholder communication"], "correctAnswer": 1},
        {"question": "Which is a key risk of not having change control in a project?", "options": ["Overly strict scope management", "Uncontrolled scope creep, budget overruns, and missed deadlines", "Too much stakeholder involvement", "Excessive documentation"], "correctAnswer": 1},
        {"question": "A 'burndown chart' in agile measures:", "options": ["Team burnout levels", "The amount of work remaining in a sprint or project over time", "Budget consumption rate", "Stakeholder satisfaction"], "correctAnswer": 1},
        {"question": "Hybrid project management combines:", "options": ["Only predictive and waterfall approaches", "Elements of predictive (plan-driven) and adaptive (agile) approaches to suit the project context", "Only agile and Lean methods", "Scrum and Kanban exclusively"], "correctAnswer": 1},
        {"question": "Project resilience in the adaptability domain refers to:", "options": ["The team's ability to work long hours", "The project's capacity to absorb disruption and adapt to maintain progress toward objectives", "Avoiding all project risks", "Completing the project under any conditions without change"], "correctAnswer": 1},
        {"question": "Which Scrum ceremony occurs at the end of a sprint to review completed work with stakeholders?", "options": ["Sprint retrospective", "Sprint review", "Sprint planning", "Daily standup"], "correctAnswer": 1},
        {"question": "A key principle of change management is:", "options": ["Implementing change as quickly as possible without communication", "Engaging those affected by change to increase adoption and minimize resistance", "Avoiding transparency about reasons for change", "Limiting change to executive decisions"], "correctAnswer": 1},
        {"question": "Which of the following is an indicator of a change-ready organization?", "options": ["Rigid processes that resist all change", "A culture that embraces learning, experimentation, and rapid adaptation", "Avoidance of external feedback", "Centralized decision-making with no delegation"], "correctAnswer": 1},
        {"question": "Why is stakeholder buy-in critical during project change?", "options": ["It increases project costs", "Stakeholder support reduces resistance, accelerates adoption, and improves change outcomes", "It eliminates all project risks", "It guarantees the project finishes on time"], "correctAnswer": 1},
        {"question": "Which of the following is a benefit of agile project management over traditional approaches?", "options": ["All requirements must be defined upfront", "Continuous delivery of value and ability to incorporate feedback throughout the project", "Strict control with no flexibility", "Reduced stakeholder involvement"], "correctAnswer": 1},
        {"question": "Managing organizational change includes:", "options": ["Developing the technical project plan only", "Communication, training, stakeholder engagement, and reinforcing new behaviors", "Avoiding team involvement in change", "Minimizing documentation of changes"], "correctAnswer": 1},
        {"question": "The 'cone of uncertainty' in project management illustrates:", "options": ["Project cost growth over time", "How uncertainty decreases as the project progresses and more is known", "Stakeholder engagement levels", "Risk probability over time"], "correctAnswer": 1},
        {"question": "Which of the following best defines organizational agility?", "options": ["Moving office locations quickly", "The ability of an organization to rapidly sense and respond to changes in the environment", "Hiring and firing employees quickly", "Completing projects faster than competitors"], "correctAnswer": 1},
        {"question": "In change management, 'reinforcement' refers to:", "options": ["Increasing project team size", "Actions to sustain and embed change so people don't revert to old behaviors", "Adding more features to the product", "Formal contract renewals"], "correctAnswer": 1},
        {"question": "Which of the following is the BEST reason to use an adaptive approach?", "options": ["The project has well-defined, stable requirements", "The project has high uncertainty, complex requirements, or a need for frequent stakeholder feedback", "The project team has no experience with agile", "The project sponsor prefers detailed upfront planning"], "correctAnswer": 1}
      ],
      "reading": `### Module 10 Final Exam
      
**📘 AI Structured Reading**
- **Purpose:** This 50-question exam validates your mastery of the Change & Adaptability Domain, including change management models, agile frameworks, and organizational readiness.
- **Goal:** Succeed in being a resilient leader who can navigate environmental shifts and project pivots.

**🌍 Practical Tips**
- Distinguish between ADKAR, Lewin, and Kotter models.
- Understand the role of the Product Owner vs. the CCB.
- Master the agile mindset of 'incremental value' and 'fail fast'.

**🏅 Badge: Resilient Catalyst**`
    }

  ],
  11: [
    {
      "id": "11.1",
      "title": "Exam Strategy: 180 Scenarios",
      "type": "video",
      "youtubeId": "TZMum9cuoJY",
      "duration": "3h 20m",
      "completed": false,
      "questions": [
        {
          "question": "A stakeholder requests a change in a predictive project. What is the PM's first step?",
          "options": ["Implement it immediately", "Update the change log and analyze impact", "Ask the sponsor for permission", "Reject it if it affects the baseline"],
          "correctAnswer": 1,
          "explanation": "In predictive environments, formal change control starts with logging and impact analysis."
        },
        {
          "question": "An agile team is struggling with a technical blocker. What should the Servant Leader do?",
          "options": ["Tell them exactly how to fix it", "Wait for the retrospective", "Facilitate a solution and remove the blocker", "Escalate to the CTO"],
          "correctAnswer": 2
        }
      ],
      "reading": `### Subject 1: Situational Judgment Mastery
      
**📘 AI Structured Reading**
- **PMP Mindset:** Always analyze before acting. Focus on being a servant leader.
- **Scenario Patterns:** Identifying 'People', 'Process', and 'Business environment' domains in questions.
- **Technique:** Eliminating 'extreme' answers (always, never, fire everyone) the PMI 'No-No's.

**🌍 Exam Tip**
- When the question says 'What should the PM do FIRST?', look for an analysis or review action.
- When it says 'What should the PM do NEXT?', look for the implementation or process step.

**🏅 Badge: Case Study Titan**`
    },
    {
      "id": "11.2",
      "title": "Full Tutorial Review",
      "type": "video",
      "youtubeId": "xocaZJaMFvM",
      "duration": "2h 45m",
      "completed": false,
      "questions": [
        {
          "question": "The PMBOK 7 shifts from Process Groups to:",
          "options": ["Agile Sprints", "Performance Domains", "Knowledge Areas", "Budget Categories"],
          "correctAnswer": 1
        }
      ],
      "reading": `### Subject 2: Condensed Study Notes
      
**📘 AI Structured Reading**
- **Performance Domains:** Stakeholder, Team, Development Approach, Planning, Project Work, Delivery, Measurement, and Uncertainty.
- **12 Principles:** Stewardship, Team, Stakeholders, Value, Systems Thinking, Leadership, Tailoring, Quality, Complexity, Risk, Adaptability, Change.
- **Tailoring:** Adapting the framework to the specific needs of the project.

**📝 Exam Checklist**
1. Understand the link between Principles and Domains.
2. Master the difference between Outputs and Outcomes.
3. Be able to justify 'Tailoring' decisions.

**🏅 Badge: Knowledge Guardian**`
    },
    {
      "id": "11.3",
      "title": "1000 Question Bank (Q&A)",
      "type": "video",
      "youtubeId": "0XOlHXtjIM0",
      "duration": "1h 30m",
      "completed": false,
      "reading": `### Subject 3: Extensive Practice
      
**📘 AI Structured Reading**
- **Volume Strategy:** Building stamina for the 180-question, 230-minute exam.
- **Difficulty Scaling:** Navigating from foundational definitions to multi-layered hybrid scenarios.
- **Error Analysis:** Categorizing why you got a question wrong (Knowledge gap vs. Logic error).

**📝 Quick Preparation**
- Set a timer for 10-minute blocks of 10 questions each.
- Focus on your weakest domains first (Uncertainty or Performance usually).

**🏅 Badge: Exam Marathoner**`
    },
    {
      "id": "11.4",
      "title": "Advanced Tutorial & Time Management",
      "type": "video",
      "youtubeId": "su41DE6dyWg",
      "duration": "45 min",
      "completed": false,
      "reading": `### Subject 4: Deep-Dive Strategies
      
**📘 AI Structured Reading**
- **Time Management:** The 75-75-80 rule (minutes per section).
- **Trap Identification:** Spotting 'Gold Plating' vs. 'Scope Creep' in questions.
- **Confidence Building:** Managing test anxiety through consistent logic application.

**🌍 Strategic Insight**
- **Focus on the 'Why':** Why is one answer 'more' correct than another in a hybrid environment?
- **Keywords:** Monitor for 'Agile', 'Predictive', 'Regulatory', and 'Critical' as they shift the correct logic.

**🏅 Badge: Master Strategist**`
    }
  ]

};

export default function ModuleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleInfo = PM_MODULES.find(m => m.id === Number(id));
  const lessons = MODULE_CONTENT[Number(id) as keyof typeof MODULE_CONTENT ] || [];
  const [activeLesson, setActiveLesson] = useState(lessons[0]);
  const [showQuiz, setShowQuiz] = useState(false);

  // Reset quiz when switching lessons
  React.useEffect(() => {
    setShowQuiz(false);
  }, [activeLesson]);

  if (!moduleInfo) return <div className="text-white p-8">Module not found.</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/courses')}
          className="p-2 glass rounded-lg text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">{moduleInfo.title}</h2>
          <p className="text-xs text-stone-400 uppercase tracking-widest font-bold">Module {id?.toString().padStart(2, '0')} • {moduleInfo.duration}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content Area (8 columns) */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {showQuiz ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-stone-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[450px] flex flex-col justify-center shadow-2xl"
              >
                <QuizComponent 
                  title={activeLesson.title}
                  questions={activeLesson.questions || []}
                  onClose={() => setShowQuiz(false)}
                  onComplete={(score) => {
                    console.log('Quiz score:', score);
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="relative aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            {activeLesson.youtubeId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${activeLesson.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                title={activeLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0"
              />
            ) : activeLesson.videoUrl ? (
              <video
                src={activeLesson.videoUrl}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center space-y-6 group">
                <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10"></div>
                
                <div className="relative z-20 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform group-hover:bg-orange-500/30 group-hover:border-orange-500/50">
                    <BrainCircuit size={32} className="text-orange-400" />
                  </div>
                  
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">{activeLesson.title}</h2>
                    <p className="text-xs text-stone-500 font-bold uppercase tracking-widest max-w-sm">No primary footage detected. Sythesize this theory using AI-Powered visuals?</p>
                  </div>

                  <Link 
                    to={`/video-lab?concept=${encodeURIComponent(activeLesson.title)}`}
                    className="flex items-center gap-2 px-6 py-2 bg-orange-500/20 border border-orange-500/40 rounded-full text-[10px] font-black text-orange-400 uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all"
                  >
                    Generate AI Explainer
                  </Link>
                </div>

                <div className="absolute bottom-6 left-6 z-10">
                  <p className="text-[10px] text-orange-400 font-bold mb-1 uppercase tracking-[0.2em]">{activeLesson.type} • {activeLesson.duration}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-white uppercase text-sm tracking-widest">{activeLesson.type === 'video' ? 'Key Transcripts' : 'Reading Material'}</h3>
              <div className="flex items-center gap-3">
                {activeLesson.reading.includes('University of Reading') && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded-md text-[9px] font-black text-orange-400 uppercase tracking-widest">
                    <GraduationCap size={12} /> University of Reading {activeLesson.reading.match(/University of Reading \+(\d+)/)?.[0].split('+')[1] ? `+${activeLesson.reading.match(/University of Reading \+(\d+)/)?.[1]}` : ''}
                  </span>
                )}
                {activeLesson.reading.includes('Liberty University') && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 border border-amber-500/20 rounded-md text-[9px] font-black text-amber-400 uppercase tracking-widest">
                    <GraduationCap size={12} /> Liberty University {activeLesson.reading.match(/Liberty University \+(\d+)/)?.[1] ? `+${activeLesson.reading.match(/Liberty University \+(\d+)/)?.[1]}` : ''}
                  </span>
                )}
                {activeLesson.reading.includes('University of Portsmouth') && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-[9px] font-black text-blue-400 uppercase tracking-widest">
                    <GraduationCap size={12} /> University of Portsmouth {activeLesson.reading.match(/University of Portsmouth \+(\d+)/)?.[1] ? `+${activeLesson.reading.match(/University of Portsmouth \+(\d+)/)?.[1]}` : ''}
                  </span>
                )}
                {activeLesson.reading.includes('PMI') && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-md text-[9px] font-black text-purple-400 uppercase tracking-widest">
                    <GraduationCap size={12} /> PMI {activeLesson.reading.match(/PMI \+(\d+)/)?.[1] ? `+${activeLesson.reading.match(/PMI \+(\d+)/)?.[1]}` : ''}
                  </span>
                )}
                {activeLesson.reading.includes('YouTube') && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded-md text-[9px] font-black text-red-400 uppercase tracking-widest">
                    <GraduationCap size={12} /> YouTube {activeLesson.reading.match(/YouTube \+(\d+)/)?.[1] ? `+${activeLesson.reading.match(/YouTube \+(\d+)/)?.[1]}` : ''}
                  </span>
                )}
                {activeLesson.reading.includes('Experfy') && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-[9px] font-black text-emerald-400 uppercase tracking-widest">
                    <GraduationCap size={12} /> Experfy {activeLesson.reading.match(/Experfy \+(\d+)/)?.[1] ? `+${activeLesson.reading.match(/Experfy \+(\d+)/)?.[1]}` : ''}
                  </span>
                )}
                {activeLesson.reading.includes('Coursera') && (
                  <span className="flex items-center gap-1.5 px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-[9px] font-black text-indigo-400 uppercase tracking-widest">
                    <GraduationCap size={12} /> Coursera {activeLesson.reading.match(/Coursera \+(\d+)/)?.[1] ? `+${activeLesson.reading.match(/Coursera \+(\d+)/)?.[1]}` : ''}
                  </span>
                )}
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{activeLesson.duration} span</span>
              </div>
            </div>
            <div className="markdown-body prose prose-invert prose-sm max-w-none text-stone-300 leading-relaxed mb-8">
              <ReactMarkdown>{activeLesson.reading}</ReactMarkdown>
            </div>
          <div className="flex gap-3">
            {activeLesson.questions && activeLesson.questions.length > 0 && (
              <button 
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-3 px-8 py-3 bg-orange-500 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 group"
              >
                <Brain size={16} className="group-hover:scale-110 transition-transform" />
                Take Quiz
              </button>
            )}
            <button className="flex items-center gap-2 px-8 py-3 bg-stone-800 border border-white/5 rounded-xl text-[10px] font-black text-stone-400 uppercase tracking-widest hover:text-white transition-all">
              Case Study
            </button>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</div>

        {/* Sidebar Info Area (4 columns) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2 uppercase tracking-tight">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_orange]"></span>
              Curriculum Progress
            </h3>
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <button 
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={cn(
                    "w-full flex items-start gap-4 p-3 rounded-xl transition-all text-left group",
                    activeLesson.id === lesson.id ? "bg-white/10 ring-1 ring-white/10" : "hover:bg-white/5"
                  )}
                >
                  <div className={cn(
                    "mt-1 w-4 h-4 rounded-full border flex items-center justify-center transition-all",
                    lesson.completed ? "bg-emerald-500/20 border-emerald-500/50" : 
                    activeLesson.id === lesson.id ? "bg-orange-500 border-orange-400 shadow-lg shadow-orange-500/40" : "border-stone-600"
                  )}>
                    {lesson.completed && <Check size={10} className="text-emerald-500" strokeWidth={4} />}
                  </div>
                  <div>
                    <p className={cn(
                      "text-xs font-semibold uppercase tracking-tight",
                      activeLesson.id === lesson.id ? "text-white" : "text-stone-400"
                    )}>
                      {lesson.title}
                    </p>
                    <p className={cn(
                      "text-[10px] uppercase font-bold tracking-widest mt-1",
                      lesson.completed ? "text-emerald-400" : "text-stone-500"
                    )}>
                      {lesson.completed ? 'Completed' : lesson.type}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
               <div className="flex justify-between text-[11px] mb-2 font-bold uppercase">
                 <span className="text-stone-500 tracking-widest">Overall Mastery</span>
                 <span className="text-white">42%</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                 <div className="h-full bg-gradient-to-r from-orange-500 to-amber-600 w-[42%] rounded-full transition-all duration-1000"></div>
               </div>
            </div>
          </div>

          <div className="bg-stone-900/60 border border-orange-500/30 rounded-2xl p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3">
              <span className="text-[10px] font-bold bg-orange-500 text-white px-2 py-1 rounded-full uppercase tracking-tighter">AI Tutor</span>
            </div>
            <h3 className="text-xs font-bold text-white mb-4 uppercase tracking-widest">Mentor Intelligence</h3>
            <div className="text-[11px] text-stone-300 leading-relaxed italic border-l-2 border-orange-500 pl-3 py-1 mb-6 font-medium">
              When analyzing the {activeLesson.title}, remember that NPV &gt; 0 implies project acceptance in most PMP scenarios.
            </div>
            <div className="flex gap-2 mt-auto">
              <Link 
                to="/chatbot?q=Explain EVM formulas" 
                className="text-[10px] font-bold text-orange-400 uppercase tracking-widest hover:text-amber-300 transition-colors flex items-center gap-2 group/btn"
              >
                Ask a specific formula <span className="text-sm group-hover/btn:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
