import emailjs from '@emailjs/browser';

export const EMAILJS_CONFIG = {
    SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_3ru1s5i',
    TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_lh0zo5q',
    PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'HsDBI6lNCSlgjv75A',
};

export const sendEmail = async (formElement: HTMLFormElement) => {
    try {
        const result = await emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            formElement,
            EMAILJS_CONFIG.PUBLIC_KEY
        );
        return { success: true, message: 'Message sent successfully!', result };
    } catch (error) {
        console.error('EmailJS Error:', error);
        return { success: false, message: 'Failed to send message. Please try again later.', error };
    }
};
