import LoginForm from '../components/LoginForm/LoginForm';
import BaseController from './BaseController';
import UserModel from '../models/UserModel';
import EventBus from '../services/EventBus';
import Events from '../services/Events';
import Urls from '../services/Urls';


class LoginController extends  BaseController {
	constructor(view) {
		super(view);
	}

	onShow() {
		const form = new LoginForm();
		form.render('body');

		UserModel.getProfile().then(response =>
		{
			if (response.error) {
				return;
			}
			EventBus.publish(Events.ChangeRoute, Urls.ProfileUrl);
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default LoginController;

