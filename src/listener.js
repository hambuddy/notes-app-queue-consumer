/* eslint-disable no-undef */ 

class Listener {
    constructor(notesService, mailSender) {
        this._notesService = notesService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const content = message.content.toString();
            const { userId, targetEmail } = JSON.parse(content);
    
            if (!userId || !targetEmail) {
                throw new Error('Invalid message format');
            }
    
            const notes = await this._notesService.getNotes(userId);
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
            console.log(result);
        } catch (error) {
            console.error('Error processing message:', error.message);
        }
    }    
}

module.exports = Listener;