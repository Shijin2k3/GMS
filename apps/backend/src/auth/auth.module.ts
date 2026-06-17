import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategyService, JwtStrategyService } from '@helper';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: {},
    }),
  ],
  providers: [AuthService, JwtStrategyService, JwtRefreshStrategyService],
  controllers: [AuthController],
})
export class AuthModule {}
