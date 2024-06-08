import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { CreateEmployeeDto } from '../employees/dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { LogoutEmployeeDto } from './dto/logout-employee.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() user: CreateEmployeeDto) {
    return this.authService.registerEmployee(user);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginEmployeeDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  async logout(@Body() dto: LogoutEmployeeDto) {
    return this.authService.logout(dto);
  }

  @Post('refresh')
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req: Request) {
    const authHeader = req.headers['authorization'] as string;
    const token = authHeader.split(' ')[1];
    return this.authService.getUserByToken(token);
  }
}
