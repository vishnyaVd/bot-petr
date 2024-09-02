import { Context, Telegraf } from 'telegraf';
import ChoiceCommand from '../commands/petya/choiceCommand';
import InfoCommand from '../commands/petya/infoCommand';
import DailyPeopleCommand from '../commands/petya/dailyPeopleCommand';
import RegistrationCommand from '../commands/petya/registrationCommand';
import WhoCommand from '../commands/petya/whoCommand';

export default class PetyaController {
  private choiceCommand: ChoiceCommand;
  private infoCommand: InfoCommand;
  private dailyPeopleCommand: DailyPeopleCommand;
  private registrationCommand: RegistrationCommand;
  private whoCommand: WhoCommand;

  constructor() {
    this.choiceCommand = new ChoiceCommand();
    this.infoCommand = new InfoCommand();
    this.dailyPeopleCommand = new DailyPeopleCommand();
    this.registrationCommand = new RegistrationCommand();
    this.whoCommand = new WhoCommand();
  }

  public async init(bot: Telegraf) {
    bot.hears(/^[Сс]офа/, async (context: Context) => {
      if (context.text) {
        const text = context.text.trim();

        // Проверяем, если команда просто "Софа" или "Софа"
        if (text === 'Софа' || text.toLowerCase() === 'Софа') {
          await context.reply('Шо');
          return;
        }

        await this.choiceCommand.init(context, text);
        await this.infoCommand.init(context, text);
        await this.dailyPeopleCommand.init(context, text);
        await this.registrationCommand.init(context, text);
        await this.whoCommand.init(context, text);
      }
    });
  }
}
