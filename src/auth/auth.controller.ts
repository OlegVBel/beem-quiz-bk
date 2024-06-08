import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() user: CreateEmployeeDto) {
    return this.authService.registerEmployee(user);
  }

  @Post('login')
  async login(@Body() dto: LoginEmployeeDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  async logout(@Req() req) {
    return this.authService.logout(req.user);
  }
  //
  // @Post('refresh')
  // async refresh(@Req() req) {
  //   return this.authService.refreshToken(req.body);
  // }
  //
  // @Get('user')
  // async getUser(@Req() req) {
  //   return this.authService.getUser(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return 'test';
  }
}
