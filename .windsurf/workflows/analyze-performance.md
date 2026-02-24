---
description: Generate performance reports and analyze with AI skills for actionable recommendations
---

# Analyze Performance Workflow

This workflow generates performance reports, analyzes them using specialized skills, and provides actionable recommendations for your Meta ads.

## Step 1: Generate Fresh Performance Report

Run the performance report generator to get current data:

```bash
cd /home/nop/CascadeProjects/Meta_ads
source venv/bin/activate
python3 src/scripts/send_performance_report.py --print-only > /tmp/performance_report.md
```

## Step 2: Generate Fatigue Report

Run the fatigue report to identify creative exhaustion:

```bash
python3 src/scripts/send_fatigue_report.py --print-only --date-preset last_7d > /tmp/fatigue_report.md
```

## Step 3: Analyze with Data Analyst Skill

Use the data-analyst skill to examine the reports and extract key insights:

**Prompt for Cascade:**
```
@[/home/nop/CascadeProjects/Meta_ads/.windsurf/skills/data-analyst]

Analyze these Meta Ads reports and provide:
1. Key performance trends (ROAS, CPA, CTR by campaign type)
2. Statistical significance of performance differences
3. Correlation between frequency and conversion rates
4. Budget allocation efficiency analysis

Reports:
@[/tmp/performance_report.md]
@[/tmp/fatigue_report.md]
```

## Step 4: Get Strategic Recommendations

Use the strategy-advisor skill for high-level business decisions:

**Prompt for Cascade:**
```
@[/home/nop/CascadeProjects/Meta_ads/.windsurf/skills/strategy-advisor]

Based on the performance data, provide strategic recommendations for:
1. Budget reallocation across campaigns
2. Market positioning (awareness vs sales focus)
3. Product category prioritization (bikes, parts, sportsbottles, workshop)
4. Seasonal adjustments for Bolivian cycling market

Context:
- Monthly budget: $500-2,000 USD
- Market: Bolivia (Spanish language)
- Business: Online sales + local repair shop in Santa Cruz

Reports:
@[/tmp/performance_report.md]
```

## Step 5: Get Paid Ads Tactical Recommendations

Use the paid-ads skill for campaign-level tactics:

**Prompt for Cascade:**
```
@[/home/nop/CascadeProjects/Meta_ads/.windsurf/skills/paid-ads]

Review the current ad performance and recommend:
1. Which campaigns/ad sets to pause immediately
2. Which campaigns to scale and by how much
3. New audience targeting strategies to test
4. Creative refresh priorities (copy vs visual)
5. Bidding strategy adjustments

Reports:
@[/tmp/performance_report.md]
@[/tmp/fatigue_report.md]
```

## Step 6: Make Final Decisions

Use the decision-helper skill to prioritize actions:

**Prompt for Cascade:**
```
@[/home/nop/CascadeProjects/Meta_ads/.windsurf/skills/decision-helper]

Help me prioritize these actions based on:
- Expected ROI impact
- Implementation effort
- Risk level
- Time sensitivity

Provide a ranked action plan with:
1. Immediate actions (today)
2. This week priorities
3. Next week experiments
4. Long-term optimizations

Context from previous analysis steps above.
```

## Step 7: Document Decisions

Save the analysis and decisions to the project:

```bash
# Create analysis log entry
echo "## Analysis $(date +%Y-%m-%d)" >> /home/nop/CascadeProjects/Meta_ads/docs/analysis_log.md
cat /tmp/performance_report.md >> /home/nop/CascadeProjects/Meta_ads/docs/analysis_log.md
echo "\n### AI Recommendations\n" >> /home/nop/CascadeProjects/Meta_ads/docs/analysis_log.md
# Paste Cascade's recommendations here
```

## Notes

- Run this workflow weekly (Saturday mornings recommended)
- Save each analysis session to `docs/analysis_log.md`
- Track implemented recommendations and their outcomes
- Adjust thresholds in `.env` based on learnings
