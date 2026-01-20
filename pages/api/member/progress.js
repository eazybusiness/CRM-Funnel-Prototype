export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { lessonId, completed } = req.body
    const userId = req.headers['x-user-id'] // From session middleware

    if (!lessonId) {
      return res.status(400).json({ error: 'Lesson ID is required' })
    }

    if (completed) {
      // Mark lesson as completed
      await query(`
        INSERT INTO user_progress (user_id, lesson_id, completed_at, progress_percentage)
        VALUES ($1, $2, NOW(), 100)
        ON CONFLICT (user_id, lesson_id) 
        DO UPDATE SET completed_at = NOW(), progress_percentage = 100
      `, [userId, lessonId])
    } else {
      // Update progress percentage
      const { progressPercentage } = req.body
      await query(`
        INSERT INTO user_progress (user_id, lesson_id, progress_percentage)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, lesson_id) 
        DO UPDATE SET progress_percentage = $3
      `, [userId, lessonId, progressPercentage || 0])
    }

    res.status(200).json({ success: true })

  } catch (error) {
    console.error('Error updating progress:', error)
    res.status(500).json({ error: 'Ein Fehler ist aufgetreten' })
  }
}

async function query(text, params) {
  // Mock implementation - replace with actual Vercel Postgres
  console.log('Query:', text, params)
  return { rows: [] }
}
