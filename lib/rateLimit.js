// Simple in-memory rate limiting for low traffic
const rateLimit = {}

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now()
  Object.keys(rateLimit).forEach(key => {
    if (now - rateLimit[key].firstAttempt > 3600000) { // 1 hour
      delete rateLimit[key]
    }
  })
}, 3600000)

export function checkRateLimit(ip, maxAttempts = 5, windowMs = 900000) { // 15 minutes
  const now = Date.now()
  const key = ip
  
  if (!rateLimit[key]) {
    rateLimit[key] = {
      count: 1,
      firstAttempt: now,
      lockedUntil: null
    }
    return { allowed: true, remaining: maxAttempts - 1 }
  }
  
  // Check if locked
  if (rateLimit[key].lockedUntil && now < rateLimit[key].lockedUntil) {
    const unlockIn = Math.ceil((rateLimit[key].lockedUntil - now) / 60000)
    return { 
      allowed: false, 
      error: `Zu viele Versuche. Bitte versuchen Sie es in ${unlockIn} Minuten erneut.`,
      retryAfter: rateLimit[key].lockedUntil
    }
  }
  
  // Reset window if expired
  if (now - rateLimit[key].firstAttempt > windowMs) {
    rateLimit[key] = {
      count: 1,
      firstAttempt: now,
      lockedUntil: null
    }
    return { allowed: true, remaining: maxAttempts - 1 }
  }
  
  // Increment counter
  rateLimit[key].count++
  
  // Check if exceeded
  if (rateLimit[key].count >= maxAttempts) {
    rateLimit[key].lockedUntil = now + windowMs
    return { 
      allowed: false, 
      error: `Zu viele Versuche. Bitte versuchen Sie es in ${Math.ceil(windowMs / 60000)} Minuten erneut.`,
      retryAfter: rateLimit[key].lockedUntil
    }
  }
  
  return { 
    allowed: true, 
    remaining: maxAttempts - rateLimit[key].count 
  }
}

// Get client IP from request
export function getClientIP(req) {
  return req.headers['x-forwarded-for'] || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         'unknown'
}
