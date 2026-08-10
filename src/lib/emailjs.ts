import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_3ru1s5i'
const TEMPLATE_ID = 'template_lh0zo5q'
const PUBLIC_KEY = 'HsDBI6lNCSlgjv75A'

export const sendEmail = async (form: HTMLFormElement): Promise<{ success: boolean; error?: unknown }> => {
  try {
    const result = await emailjs.sendForm(
      SERVICE_ID,
      TEMPLATE_ID,
      form,
      PUBLIC_KEY
    )
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}
