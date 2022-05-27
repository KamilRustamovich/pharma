import { Controller, Get, Redirect, Render} from '@nestjs/common';

@Controller()
export class IndexController {
	@Get('signIn')
    @Render('admin/login')
	async singIn() {
		return;
	}

	@Get()
	@Render('index')
	async index() {
		return;
	}

	@Get('signUp')
	@Render('admin/register')
	async signUp() {
		return;
	}

	@Get('forgotPassword')
	@Render('admin/forgot_pass')
	async forgotPassword() {
		return;
	}

	@Get('admin')
	@Render('admin/index')
	async AdminPage() {
		return;
	}
}
