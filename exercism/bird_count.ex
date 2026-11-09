defmodule BirdCount do
  def today(list) do
    today_p(list)
  end

  def increment_day_count(list) do
    increment_day_count_p(list)
  end

  def has_day_without_birds?(list) do
    has_day_without_birds_p(list)
  end

  def total(list) do
    total_p(list)
  end

  def busy_days(list) do
    busy_days_p(list)
  end

  defp today_p([]), do: nil
  defp today_p([head | _tail]), do: head

  defp increment_day_count_p([]), do: [1]
  defp increment_day_count_p([head | tail]), do: [head + 1 | tail]

  defp has_day_without_birds_p([]), do: false
  defp has_day_without_birds_p([0 | _tail]), do: true
  defp has_day_without_birds_p([_ | tail]), do: has_day_without_birds_p(tail)

  defp total_p([]), do: 0
  defp total_p([head | tail]), do: head + total_p(tail)

  defp busy_days_p([]), do: 0
  defp busy_days_p([head | tail]) when head >= 5, do: 1 + busy_days_p(tail)
  defp busy_days_p([_ | tail]), do: busy_days_p(tail)
end
