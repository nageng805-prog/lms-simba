import { users } from '../data/users'
import * as d from '../data/academic'
import { createCrudService } from './createCrudService'
import { request } from './http'

export { authService } from './authService'
export const userService = createCrudService(users.map(({ password: _p, ...u }) => u))
export const classService = createCrudService(d.classes)
export const subjectService = createCrudService(d.subjects)
export const materialService = createCrudService(d.materials)
export const assignmentService = createCrudService(d.assignments)
export const submissionService = createCrudService(d.submissions)
export const gradeService = createCrudService(d.grades)
export const scheduleService = createCrudService(d.schedules)
export const announcementService = createCrudService(d.announcements)
export const reportService = createCrudService(d.reports)
export const settingService = { get: () => request(() => d.settings) }
export { teacherService } from './teacherService'
