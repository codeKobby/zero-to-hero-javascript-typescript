// Day 45 - Capstone planner. Replace this small planner with your own app.
export {}
type Plan = { title: string; milestones: string[] }
const STORAGE_KEY = 'day45-capstone-plan'
const readPlan = (): Plan => { try { const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'); if (typeof value === 'object' && value !== null && 'title' in value && 'milestones' in value && typeof value.title === 'string' && Array.isArray(value.milestones) && value.milestones.every(item => typeof item === 'string')) return value as Plan } catch { /* use default */ } return { title: 'My capstone', milestones: [] } }
const state = readPlan()
const root = document.querySelector('#app'); if (!(root instanceof HTMLElement)) throw new Error('Missing #app')
root.innerHTML = '<h1>Capstone planner</h1><p>Plan the smallest useful version before you build it.</p><form id="plan"><label>Project title <input id="title" required></label><label>Milestone <input id="milestone" required></label><button>Add milestone</button></form><h2 id="heading"></h2><ol id="milestones"></ol>'
const title = document.querySelector('#title'); const form = document.querySelector('#plan'); const milestone = document.querySelector('#milestone'); const heading = document.querySelector('#heading'); const list = document.querySelector('#milestones')
if (!(title instanceof HTMLInputElement) || !(form instanceof HTMLFormElement) || !(milestone instanceof HTMLInputElement) || !(heading instanceof HTMLElement) || !(list instanceof HTMLOListElement)) throw new Error('Missing planner controls')
const ui = { title, form, milestone, heading, list }
ui.title.value = state.title
function save(): void { state.title = ui.title.value.trim() || 'My capstone'; localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }
function render(): void { ui.heading.textContent = state.title; ui.list.replaceChildren(...state.milestones.map(item => { const li = document.createElement('li'); li.textContent = item; return li })) }
ui.form.addEventListener('submit', event => { event.preventDefault(); const value = ui.milestone.value.trim(); if (!value) return; state.milestones.push(value); ui.milestone.value = ''; save(); render() })
ui.title.addEventListener('input', () => { save(); render() }); render()
