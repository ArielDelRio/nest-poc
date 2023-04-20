import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { ROUTES } from 'src/common/constants';

@Controller(ROUTES.AGENTS.base)
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @Post(ROUTES.AGENTS.CALL.base)
  call(@Body('CallStatus') callStatus, @Query('agentId') agentId) {
    return this.agentsService.call(callStatus, agentId);
  }

  @Post(ROUTES.AGENTS.HANGUP.base)
  hangup() {
    return this.agentsService.hangup();
  }

  @Post(ROUTES.AGENTS.SCREEN_CALL.base)
  screenCall(@Body() body) {
    return this.agentsService.screenCall(body.From);
  }

  @Post(ROUTES.AGENTS.CONNECT_MESSAGE.base)
  connectMessage() {
    return this.agentsService.connectMessage();
  }
}
