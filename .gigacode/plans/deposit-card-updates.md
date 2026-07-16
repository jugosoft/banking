# План обновления компонента депозита

## 1. Цветовая палитра

### 1.1 Добавить переменные цветов в глобальный файл `src/styles/_variables.scss`

Добавить следующие переменные цветов:

```scss
// Цветовая палитра в стиле Сбербанка
$sber-green-gradient-start: #66ab56;
$sber-green-gradient-end: #77be87;
$sber-blue: #005b96;
$sber-blue-light: #0072c3;
$sber-blue-dark: #00457a;
$sber-green: #00a854;
$sber-red: #dc3545;
$sber-gray-light: #f5f7fa;
$sber-gray-border: #eaeef5;
$sber-gray-text: #667085;
$sber-white: #ffffff;

// Градиент для хедера
$sber-header-gradient: linear-gradient(135deg, $sber-green-gradient-start 0%, $sber-green-gradient-end 100%);
```

### 1.2 Обновить SCSS компонента депозита

Заменить жестко заданные цвета на переменные:

- Header background: `linear-gradient(135deg, #66ab56 0%, #77be87 100%)` → `$sber-header-gradient`
- All other colors → использовать переменные из палитры

## 2. Модальное окно подтверждения удаления

### 2.1 Создать компонент модального окна

Создать новый компонент `src/app/modules/shared/confirm-delete-dialog/`:

- `confirm-delete-dialog.component.ts` - логика компонента
- `confirm-delete-dialog.component.html` - шаблон
- `confirm-delete-dialog.component.scss` - стили

Компонент должен:
- Использовать Angular Material Dialog
- Иметь заголовок "Подтверждение удаления"
- Текст: "Вы уверены, что хотите удалить этот вклад?"
- Кнопки: "Отмена" и "Удалить"

### 2.2 Обновить `MaterialModule`

Добавить `MatDialogModule` в импорты и экспорты.

### 2.3 Обновить `SharedModule`

Добавить декларацию и экспорт нового компонента диалога.

### 2.4 Обновить `DepositCardComponent`

- Импортировать `MatDialog`
- Открывать диалог при нажатии на кнопку "Удалить"
- Обрабатывать подтверждение пользователя

## 3. Исправление расчета текущей суммы

### 3.1 Проблема

Текущая формула расчета текущей суммы использует правильный подход:

```typescript
// Определяем, сколько дней прошло с момента открытия
const daysPassed = Math.max(0, dateDiffInDays(startDate, now));
const totalDays = Math.max(1, dateDiffInDays(startDate, endDate));

// Рассчитываем текущую сумму (простые проценты)
// Формула: текущая сумма = начальная сумма + (начальная сумма * ставка * дни / 365 / 100)
const annualRate = this.deposit.percent;
const dailyRate = annualRate / 365 / 100;
const interest = this.deposit.amount * dailyRate * daysPassed;

this.currentAmount = this.deposit.amount + interest;
```

Эта формула верна. Возможно, проблема в том, что `deposit.startDate` или `deposit.endDate` приходят в неправильном формате или timezone.

### 3.2 Исправление

Убедиться, что даты корректно обрабатываются:
- Приводить к `Date` объекту
- Учитывать timezone при сравнении
- Убедиться, что `deposit.amount` - это число, а не строка

## Структура выполнения

1. Добавить переменные цветов в `_variables.scss`
2. Обновить `deposit-card.component.scss` для использования переменных
3. Обновить `MaterialModule` для добавления `MatDialogModule`
4. Создать компонент `confirm-delete-dialog`
5. Обновить `SharedModule`
6. Обновить `DepositCardComponent` для использования диалога
7. Проверить и протестировать расчет текущей суммы
