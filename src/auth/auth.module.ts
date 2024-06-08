import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';
import { EmployeesModule } from '../employees/employees.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [EmployeesModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
