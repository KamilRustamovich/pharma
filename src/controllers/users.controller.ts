import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ChangePasswordDTO, RefreshTokenDTO, ResendEmailDTO, SignInDTO, SignUpDTO, VerifyEmailDTO } from "../core/users/dtos";
import { ConfirmRestoredPasswordDTO } from "../core/users/dtos/restore-password.dto";
import { UsersAuthService } from "../core/users/services/users-auth.service";
import { UserEntity } from "../database/entities/user.entity";
import { User } from "../shared/decorators/user.decorator";

@Controller('user')
export class UsersController {
	constructor(private readonly usersService: UsersAuthService) { }

	@Post()
	async signUp(@Body() signUpDTO: SignUpDTO) {
		return await this.usersService.signUp(signUpDTO);
	}

    @Post()
	async signIn(@Body() signInDTO: SignInDTO) {
		return await this.usersService.signIn(signInDTO);
	}

    @Post()
	async refreshToken(@Body() refreshTokenDTO: RefreshTokenDTO) {
		return await this.usersService.refreshToken(refreshTokenDTO);
	}

    @Post()
	async verifyEmail(@Body() verifyEmailDTO: VerifyEmailDTO) {
		return await this.usersService.verifyEmail(verifyEmailDTO);
	}

    @Post()
	async resendEmail(@Body() resendEmailDTO: ResendEmailDTO) {
		return await this.usersService.resendEmail(resendEmailDTO);
	}

    @Post()
	async restorePassword(@Body() resendEmailDTO: ResendEmailDTO) {
		return await this.usersService.restorePassword(resendEmailDTO);
	}

	@Post()
	async confirmRestoredPassword(@Body() confirmRestoredPasswordDTO: ConfirmRestoredPasswordDTO) {
		return await this.usersService.confirmRestoredPassword(confirmRestoredPasswordDTO);
	}

	@Post()
	async changePassword(@Body() changePasswordDTO: ChangePasswordDTO) {
		return await this.usersService.changePassword(changePasswordDTO);
	}

    // @Get()
    // async user(@User() user: UserEntity){
    //     return await this._usersInfoService.getUser(user)
    // }
}