import { Body, Controller, Get, Param, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';

import { log } from 'console';
import { UpdatePwDto } from './dto/update-pw.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) { }


  // ================================ Register or Sign up ===============================================
  @Post('/signup')
  @UsePipes(ValidationPipe) // use pipes for validation dto
  async signUp(@Body() signUpDto: SignUpDto, @Req() req: Request): Promise<{ success: boolean, user: User }> {
    const result = await this.authService.signUp(signUpDto);
    const token = this.jwtService.sign({ user: result.user });
    req.session.jwtToken = token; 
    return result;
  }


  // ================================= login ============================================================
  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto, @Req() req: Request): Promise<{ success: boolean; user: User }> {
    const result = await this.authService.login(loginDto);
    const token = this.jwtService.sign({ user: result.user });
    req.session.jwtToken = token; 
    return result;
  }


  // ================================= Logout ===========================================================
  @Post('logout')
  logout(@Req() req: any) {
    // Call the logout function and pass the session and response objects
    return this.authService.logout(req.session);

  }



  // ================================= user:id ==========================================================
  @Get('/user/:id')
  async getUserById(@Param('id') id: any): Promise<{ user?: User, status?: boolean; message?: string; err?: any }> {
    return await this.authService.findById(id);
  }



  // ================================ me =============================================================
  @Get('/me')
  async getMe(@Req() req: Request) {
    return req.user;
  }


  // ============================= delete user id =================================================
  @Post('/user/delete/:id')
  async deleteUserById(@Param('id') id: any): Promise<{ status?: boolean; message?: string }> {
    return await this.authService.deleteUserById(id);
  }


  // ============================ update password =====================================================
  @Post('/user/update/password')
  @UsePipes(ValidationPipe)
  async updatePassword(@Req() req: Request, @Body() passwds: UpdatePwDto) {
    return await this.authService.updatePassword(req.user, passwds);
  }



  // ============================ update user =====================================================
  @Post('/user/update')
  @UsePipes(ValidationPipe)
  async updateUser(@Req() req: Request, @Body() newUser: UpdateUserDto) {
    return await this.authService.updateUser(req.user, newUser);
  }

}
