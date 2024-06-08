import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';
import { EmployeesModule } from '../employees/employees.module';
import { TokenModule } from '../token/token.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [EmployeesModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService],
})
export class AuthModule {}
